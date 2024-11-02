import type { Categoria } from "./categoria"

export interface Producto {
  id: number
  idCategoria: number
  codigo: string
  nombre: string
  descripcion: string
  tipoUnidad: string
  precioCompra: number
  precioVenta: number
  stock: number
  categoria: Categoria
}