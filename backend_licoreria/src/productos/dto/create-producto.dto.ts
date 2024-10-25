import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo codigo es obligatorio' })
  @IsString({ message: 'El campo codigo debe ser de tipo cadena' })
  @MaxLength(10, {
    message: 'El campo codigo no debe ser mayor a 10 caracteres',
  })
  readonly codigo: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nombre es obligatorio' })
  @IsString({ message: 'El campo nombre debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo nombre no debe ser mayor a 30 caracteres',
  })
  readonly nombre: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo descripcion es obligatorio' })
  @IsString({ message: 'El campo descripcion debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo descripcion no debe ser mayor a 50 caracteres',
  })
  readonly descripcion: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo tipoUnidad es obligatorio' })
  @IsString({ message: 'El campo tipoUnidad debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo tipoUnidad no debe ser mayor a 30 caracteres',
  })
  readonly tipoUnidad: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo precioCompra es obligatorio' })
  @IsNumber({}, { message: 'El campo precioCompra debe ser un numero' })
  @MaxLength(5, {
    message: 'El campo precioCompra no debe ser mayor a 5 caracteres',
  })
  readonly precioCompra: number;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo precioVenta es obligatorio' })
  @IsNumber({}, { message: 'El campo precioVenta debe ser de tipo numero' })
  @MaxLength(5, {
    message: 'El campo precioVenta no debe ser mayor a 5 caracteres',
  })
  readonly precioVenta: number;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo stock es obligatorio' })
  @IsNumber({}, { message: 'El campo stock debe ser de tipo numero' })
  @MaxLength(5, {
    message: 'El campo stock no debe ser mayor a 5 caracteres',
  })
  readonly stock: number;

  @ApiProperty() //Swagger
  @IsDefined({ message: 'El campo idCategoria debe estar definido' })
  @IsNumber({}, { message: 'El campo idCategoria debe ser de tipo numérico' })
  readonly idCategoria: number;
}
