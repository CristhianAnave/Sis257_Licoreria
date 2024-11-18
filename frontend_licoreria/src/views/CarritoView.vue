<script lang="ts">
  import { useCartStore } from '@/stores/cart'; // Importamos el store de Pinia
  import { computed, ref } from 'vue'; // Computed para calcular el total
  import axios from 'axios'; // Para realizar la llamada a la API (si fuera necesario)

  export default {
    setup() {
      // Usamos el store de Pinia para el carrito
      const cartStore = useCartStore();

      // State para mostrar el diálogo de error
      const showDialog = ref(false);
      const dialogMessage = ref("");

      // Función para calcular el total del carrito
      const totalCarrito = computed(() => {
        return cartStore.productos.reduce((total, producto) => {
          return total + producto.precioVenta * producto.cantidad;
        }, 0);
      });

      // Función para eliminar un producto del carrito
      function eliminarProducto(productoId: number) {
        cartStore.eliminarDelCarrito(productoId);
      }

      // Función para vaciar el carrito
      function vaciarCarrito() {
        cartStore.vaciarCarrito();
      }

      // Función para aumentar la cantidad de un producto
      function aumentarCantidad(productoId: number, stock: number) {
        const producto = cartStore.productos.find(p => p.id === productoId);
        if (producto) {
          if (producto.cantidad < stock) {
            producto.cantidad++;
          } else {
            dialogMessage.value = `No puedes comprar más de ${stock} unidades de este producto.`;
            showDialog.value = true;
          }
        }
      }

      // Función para disminuir la cantidad de un producto
      function disminuirCantidad(productoId: number) {
        const producto = cartStore.productos.find(p => p.id === productoId);
        if (producto && producto.cantidad > 1) {
          producto.cantidad--;
        }
      }

      // Filtro de formato de moneda (Bs) usando toLocaleString
      function formatCurrency(value: number): string {
        return value.toLocaleString('es-BO', {
          style: 'currency',
          currency: 'BOB',  // Bolivianos
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
      }

      // Función para registrar la venta
      function registrarVenta() {
        alert('Venta registrada con éxito');
        // Aquí puedes agregar la lógica para registrar la venta, por ejemplo, enviando los datos al backend.
      }

      return {
        cartStore,
        totalCarrito,
        eliminarProducto,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
        formatCurrency,
        registrarVenta,
        showDialog,
        dialogMessage,
      };
    },
  };
</script>

<template>
  <div class="carrito-view">
    <h1>Carrito de Compras</h1>

    <!-- Mensaje cuando el carrito está vacío -->
    <div v-if="cartStore.productos.length === 0" class="empty-cart">
      <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
    </div>

    <!-- Tabla de productos en el carrito -->
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Categoría</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>Subtotal</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in cartStore.productos" :key="producto.id">
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>
              <!-- Controles para aumentar y disminuir cantidad -->
              <div class="cantidad-controls">
                <button @click="disminuirCantidad(producto.id)" :disabled="producto.cantidad === 1">-</button>
                <span>{{ producto.cantidad }}</span>
                <button @click="aumentarCantidad(producto.id, producto.stock)">+</button>
              </div>
            </td>
            <td>{{ formatCurrency(producto.precioVenta) }}</td>
            <td>{{ formatCurrency(producto.precioVenta * producto.cantidad) }}</td>
            <td>
              <button @click="eliminarProducto(producto.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="total">
        <h3>Total: {{ formatCurrency(totalCarrito) }}</h3>
      </div>

      <!-- Botones para vaciar carrito y registrar venta -->
      <div class="botones-acciones">
        <button @click="vaciarCarrito">Vaciar carrito</button>
        <button @click="registrarVenta" class="registrar-venta">Registrar venta</button>
      </div>
    </div>

    <!-- Cuadro de diálogo de error -->
    <Dialog v-model:visible="showDialog" header="Error" :style="{ width: '300px' }">
      <p>{{ dialogMessage }}</p>
      <template #footer>
        <Button label="Cerrar" icon="pi pi-check" @click="showDialog = false" />
      </template>
    </Dialog>
  </div>
</template>

<style scoped>
  .carrito-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 20px;
  }

  .empty-cart {
    text-align: center;
    font-size: 1.2rem;
    color: #888;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: transparent;
    /* Fondo de tabla transparente */
  }

  th,
  td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
    color: #ccc;
    /* Color gris claro para las letras */
  }

  th {
    background-color: #333;
    /* Fondo gris oscuro para el encabezado */
    color: white;
    /* Color blanco para el texto del encabezado */
    font-weight: bold;
  }

  td {
    background-color: transparent;
    /* Fondo transparente en las celdas */
  }

  td button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
  }

  td button:hover {
    background-color: #218838;
  }

  .total {
    margin-top: 20px;
    text-align: right;
  }

  .botones-acciones {
    margin-top: 20px;
    text-align: center;
    display: flex;
    justify-content: center;
    gap: 15px;
    /* Espacio entre los botones */
  }

  button {
    background-color: #28a745;
    /* Botón verde */
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #218838;
  }

  .registrar-venta {
    background-color: #007bff;
    /* Botón azul para registrar la venta */
  }

  .registrar-venta:hover {
    background-color: #0056b3;
    /* Hover para el botón de venta */
  }

  /* Estilo para los controles de cantidad */
  .cantidad-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* Espacio entre los botones y el valor */
  }

  .cantidad-controls button {
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
    border-radius: 5px;
    background-color: #f0f0f0;
    color: #333;
    cursor: pointer;
  }

  .cantidad-controls button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .cantidad-controls span {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
</style>