import { Cliente } from 'src/clientes/entities/cliente.entity';
import { Detalleventa } from 'src/detalleventa/entities/detalleventa.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'monto_total', nullable: true })
  montoTotal: number;

  @CreateDateColumn({ name: 'fecha_creacion', nullable: true })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_elimanacion', select: false })
  fechaEliminacion: Date;

  @ManyToOne(() => Usuario, (usuario) => usuario.ventas)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuarios: Usuario;

  @ManyToOne(() => Cliente, (cliente) => cliente.ventas)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @OneToMany(() => Detalleventa, (detalleventa) => detalleventa.venta)
  detalleventas: Detalleventa[];
}
