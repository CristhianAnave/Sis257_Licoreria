import { Injectable } from '@nestjs/common';
import { CreateDetallecompraDto } from './dto/create-detallecompra.dto';
import { UpdateDetallecompraDto } from './dto/update-detallecompra.dto';

@Injectable()
export class DetallecomprasService {
  create(createDetallecompraDto: CreateDetallecompraDto) {
    return 'This action adds a new detallecompra';
  }

  findAll() {
    return `This action returns all detallecompras`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detallecompra`;
  }

  update(id: number, updateDetallecompraDto: UpdateDetallecompraDto) {
    return `This action updates a #${id} detallecompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} detallecompra`;
  }
}
