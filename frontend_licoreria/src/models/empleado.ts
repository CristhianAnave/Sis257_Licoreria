import type { Usuario} from "./usuario"

export interface Empleado {
  id: number
  ci: string
  idUsuarios: number
  nombres: string
  apellidoPaterno: string
  apellidoMaterno: string
  cargo: string
  email: string
  direccion: string
  celular: string
  fechaContratacion: string | null
  usuarios: Usuario
}