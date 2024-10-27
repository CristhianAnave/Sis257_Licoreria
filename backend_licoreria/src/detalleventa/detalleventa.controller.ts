import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DetalleventaService } from './detalleventa.service';
import { CreateDetalleventaDto } from './dto/create-detalleventa.dto';
import { UpdateDetalleventaDto } from './dto/update-detalleventa.dto';

@Controller('detalleventa')
export class DetalleventaController {
  constructor(private readonly detalleventaService: DetalleventaService) {}

  @Post()
  create(@Body() createDetalleventaDto: CreateDetalleventaDto) {
    return this.detalleventaService.create(createDetalleventaDto);
  }

  @Get()
  findAll() {
    return this.detalleventaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleventaService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDetalleventaDto: UpdateDetalleventaDto,
  ) {
    return this.detalleventaService.update(+id, updateDetalleventaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleventaService.remove(+id);
  }
}
