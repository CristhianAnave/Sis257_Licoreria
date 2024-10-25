import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo ci es obligatorio' })
  @IsString({ message: 'El campo ci debe ser de tipo cadena' })
  @MaxLength(10, { message: 'El campo ci no debe ser mayor a 10 caracteres' })
  readonly ci: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo nombres es obligatorio' })
  @IsString({ message: 'El campo nombres debe ser de tipo cadena' })
  @MaxLength(50, {
    message: 'El campo nombres no debe ser mayor a 50 caracteres',
  })
  readonly nombres: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo apellidoPaterno es obligatorio' })
  @IsString({ message: 'El campo apellidoPaterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellidoPaterno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoPaterno: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo apellidoMaterno es obligatorio' })
  @IsString({ message: 'El campo apellidoMaterno debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo apellidoMaterno no debe ser mayor a 30 caracteres',
  })
  readonly apellidoMaterno: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo email es obligatorio' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(30, {
    message: 'El campo email no debe ser mayor a 30 caracteres',
  })
  readonly email: string;

  @ApiProperty() //Swagger
  @IsNotEmpty({ message: 'El campo celular es obligatorio' })
  @IsString({ message: 'El campo celular debe ser de tipo cadena' })
  @MaxLength(8, {
    message: 'El campo celular no debe ser mayor a 8 caracteres',
  })
  readonly celular: string;
}
