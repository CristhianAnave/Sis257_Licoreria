import { Module } from '@nestjs/common';
import { DetalleventaService } from './detalleventa.service';
import { DetalleventaController } from './detalleventa.controller';
import { Detalleventa } from './entities/detalleventa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Detalleventa])],
  controllers: [DetalleventaController],
  providers: [DetalleventaService],
})
export class DetalleventaModule {}
