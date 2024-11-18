// src/stores/cart.ts
import { defineStore } from 'pinia'
import type { ProductoCarrito } from '@/models/productoCarrito' // Importamos el tipo correcto

export const useCartStore = defineStore('cart', {
  state: () => ({
    // Lista de productos en el carrito
    productos: [] as ProductoCarrito[], // Aquí cambiamos a ProductoCarrito[]
  }),
  actions: {
    // Acción para agregar un producto al carrito
    agregarAlCarrito(producto: ProductoCarrito) {
      const productoExistente = this.productos.find(p => p.id === producto.id)
      if (productoExistente) {
        // Si el producto ya está en el carrito, solo incrementamos la cantidad
        productoExistente.cantidad++
      } else {
        // Si el producto no está en el carrito, lo agregamos con cantidad 1
        this.productos.push({ ...producto, cantidad: 1 })
      }
    },
    // Acción para eliminar un producto del carrito
    eliminarDelCarrito(productoId: number) {
      this.productos = this.productos.filter(p => p.id !== productoId)
    },
    // Acción para limpiar el carrito (por ejemplo, después de realizar una venta)
    vaciarCarrito() {
      this.productos = []
    },
  },
})
