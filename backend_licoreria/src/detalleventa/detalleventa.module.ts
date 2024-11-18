import { Module } from '@nestjs/common';
import { DetalleventaService } from './detalleventa.service';
import { DetalleventaController } from './detalleventa.controller';
import { Detalleventa } from './entities/detalleventa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosModule } from 'src/productos/productos.module';
import { VentasModule } from 'src/ventas/ventas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Detalleventa]),
    ProductosModule,
    VentasModule,
  ],
  controllers: [DetalleventaController],
  providers: [DetalleventaService],
})
export class DetalleventaModule {}
