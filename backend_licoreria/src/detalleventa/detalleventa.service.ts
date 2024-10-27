import { Injectable } from '@nestjs/common';
import { CreateDetalleventaDto } from './dto/create-detalleventa.dto';
import { UpdateDetalleventaDto } from './dto/update-detalleventa.dto';

@Injectable()
export class DetalleventaService {
  create(createDetalleventaDto: CreateDetalleventaDto) {
    return 'This action adds a new detalleventa';
  }

  findAll() {
    return `This action returns all detalleventa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleventa`;
  }

  update(id: number, updateDetalleventaDto: UpdateDetalleventaDto) {
    return `This action updates a #${id} detalleventa`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleventa`;
  }
}
