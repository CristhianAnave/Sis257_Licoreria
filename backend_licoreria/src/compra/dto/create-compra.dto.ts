import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsNumber } from 'class-validator';

export class CreateCompraDto {
  @ApiProperty() //Swagger
  @IsDefined({ message: 'El campo idUsuario debe estar definido' })
  @IsNumber({}, { message: 'El campo idUsuario debe ser de tipo númerico' })
  readonly idUsuario: number;

  @ApiProperty() //Swagger
  @IsDefined({ message: 'El campo idProveedor debe estar definido' })
  @IsNumber({}, { message: 'El campo idProveedor debe ser de tipo númerico' })
  readonly idProveedor: number;
}
