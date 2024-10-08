import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty({ message: 'El campo usuario es obligatorio' })
  @IsString({ message: 'El campo usuario debe ser tipo cadena' })
  @MaxLength(20, {
    message: 'El campo usuario no debe ser mayor a 20 caracteres',
  })
  readonly usuario: string;

  @IsNotEmpty({ message: 'El campo clave es obligatorio' })
  @IsString({ message: 'El campo clave debe ser tipo cadena' })
  @MaxLength(10, {
    message: 'El campo clave no debe ser mayor a 10 caracteres',
  })
  readonly clave: string;

  @IsNotEmpty({ message: 'El campo rol es obligatorio' })
  @IsString({ message: 'El campo rol debe ser tipo cadena' })
  @MaxLength(30, {
    message: 'El campo rol no debe ser mayor a 30 caracteres',
  })
  readonly rol: string;
}
