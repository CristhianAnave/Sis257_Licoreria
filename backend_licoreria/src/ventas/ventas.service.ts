import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Detalleventa } from 'src/detalleventa/entities/detalleventa.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta) private ventasRepository: Repository<Venta>,
    @InjectRepository(Detalleventa)
    private detalleventaRepository: Repository<Detalleventa>,
  ) {}

  // Elimina la verificación de "venta existente" para permitir múltiples ventas por cliente
  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    // Ya no estamos verificando si existe una venta para este cliente

    // Crear la venta sin montoTotal
    const venta = new Venta();
    venta.usuarios = { id: createVentaDto.idUsuario } as Usuario;
    venta.cliente = { id: createVentaDto.idCliente } as Cliente;

    // Guardamos la venta inicialmente
    const savedVenta = await this.ventasRepository.save(venta);

    // Obtenemos los detalles de venta para esta venta recién creada
    const detallesVenta = await this.detalleventaRepository.find({
      where: { venta: { id: savedVenta.id } },
    });

    // Calcular el monto total
    const montoTotal = detallesVenta.reduce(
      (total, detalle) => total + detalle.subtotal,
      0,
    );

    // Actualizar la venta con el montoTotal calculado
    savedVenta.montoTotal = montoTotal;

    // Guardamos la venta con el monto total actualizado
    return this.ventasRepository.save(savedVenta);
  }

  async findAll(): Promise<Venta[]> {
    const ventas = await this.ventasRepository.find({
      relations: ['usuarios', 'cliente'],
    });

    // Mapear las ventas para asegurar que la fecha esté en formato ISO si es necesario
    return ventas.map((venta) => ({
      ...venta,
      fecha_creacion: venta.fechaCreacion.toISOString(), // Formatear la fecha de creación a formato ISO
    }));
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({
      where: { id },
      relations: ['usuarios', 'cliente', 'detalleventas'],
    });
    if (!venta) {
      throw new NotFoundException(`La venta ${id} no existe`);
    }
    return venta;
  }

  // Método para actualizar parcialmente una venta existente (usando PATCH)
  async update(id: number, updateVentaDto: CreateVentaDto): Promise<Venta> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Actualizar los campos que vengan en el DTO
    if (updateVentaDto.idUsuario) {
      venta.usuarios = { id: updateVentaDto.idUsuario } as Usuario;
    }
    if (updateVentaDto.idCliente) {
      venta.cliente = { id: updateVentaDto.idCliente } as Cliente;
    }

    // Guardar la venta con los cambios parciales
    return this.ventasRepository.save(venta);
  }

  // Método para eliminar lógicamente una venta
  async remove(id: number): Promise<void> {
    const venta = await this.ventasRepository.findOne({ where: { id } });
    if (!venta) {
      throw new NotFoundException(`Venta con id ${id} no encontrada`);
    }

    // Marcar la venta como eliminada
    venta.fechaEliminacion = new Date(); // Establecemos la fecha de eliminación

    // Guardamos la venta con la fecha de eliminación
    await this.ventasRepository.save(venta);
  }
}
