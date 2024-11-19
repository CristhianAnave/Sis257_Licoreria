<script lang="ts">
import { useCartStore } from '@/stores/cart'; // Importamos el store de Pinia
import { computed, ref } from 'vue'; // Computed para calcular el total
import InputText from 'primevue/inputtext'; // Importamos InputText de PrimeVue
import Button from 'primevue/button'; // Importamos Button de PrimeVue
import Dialog from 'primevue/dialog'; // Importamos el componente Dialog para el modal

export default {
  components: {
    InputText,
    Button,
    Dialog,  // Componente de PrimeVue para el modal
  },
  setup() {
    const cartStore = useCartStore();

    // Estado para mostrar el modal del formulario de cliente
    const mostrarFormularioCliente = ref(false);

    // Estado para almacenar el cliente seleccionado
    const clienteSeleccionado = ref({
      ci: '',
      nombre: '',
      direccion: '',
      telefono: ''
    });

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

    // Función para registrar la venta
    function registrarVenta() {
      if (!clienteSeleccionado.value) {
        alert('Debe seleccionar un cliente para completar la venta.');
        return;
      }
      alert('Venta registrada con éxito');
    }

    // Función para formatear la moneda
    function formatCurrency(value: number): string {
      return value.toLocaleString('es-BO', {
        style: 'currency',
        currency: 'BOB',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    }

    // Función para mostrar el formulario en un modal
    function mostrarFormulario() {
      mostrarFormularioCliente.value = true;
    }

    // Función para cerrar el formulario del cliente
    function cerrarFormulario() {
      mostrarFormularioCliente.value = false;
    }

    return {
      cartStore,
      totalCarrito,
      eliminarProducto,
      vaciarCarrito,
      aumentarCantidad,
      disminuirCantidad,
      registrarVenta,
      clienteSeleccionado,  // Datos del cliente
      formatCurrency,
      mostrarFormulario,
      cerrarFormulario,
      mostrarFormularioCliente,  // Estado para mostrar el formulario
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

      <div class="botones-acciones">
        <button @click="vaciarCarrito">Vaciar carrito</button>
        <button @click="registrarVenta" class="registrar-venta">Registrar venta</button>
      </div>
    </div>

    <!-- Botón para seleccionar cliente -->
    <button @click="mostrarFormulario" class="seleccionar-cliente">
      Seleccionar Cliente
    </button>

    <!-- Modal para ingresar datos del cliente -->
    <Dialog v-model:visible="mostrarFormularioCliente" header="Formulario de Cliente" :style="{ width: '400px' }" :modal="true" :closable="false">
      <div class="formulario-cliente">
        <form>
          <label for="ci">Cédula:</label>
          <InputText v-model="clienteSeleccionado.ci" id="ci" placeholder="Ingrese cédula" class="input-text" />
          <br />

          <label for="nombre">Nombre:</label>
          <InputText v-model="clienteSeleccionado.nombre" id="nombre" placeholder="Ingrese nombre" class="input-text" />
          <br />

          <label for="direccion">Dirección:</label>
          <InputText v-model="clienteSeleccionado.direccion" id="direccion" placeholder="Ingrese dirección" class="input-text" />
          <br />

          <label for="telefono">Teléfono:</label>
          <InputText v-model="clienteSeleccionado.telefono" id="telefono" placeholder="Ingrese teléfono" class="input-text" />
          <br />

          <Button label="Cerrar" icon="pi pi-times" @click="cerrarFormulario" class="cerrar-formulario" />
        </form>
      </div>
    </Dialog>

  </div>
</template>

<style scoped>
  .carrito-view {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
    background-color: transparent;
  }

  th, td {
    padding: 12px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #333;
    color: white;
  }

  td {
    background-color: transparent;
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
  }

  button {
    background-color: #28a745;
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
  }

  .registrar-venta:hover {
    background-color: #0056b3;
  }

  .cantidad-controls {
    display: flex;
    align-items: center;
    gap: 10px;
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

  /* Estilos del formulario de cliente */
  .formulario-cliente {
    margin-top: 20px;
    padding: 20px;
    background-color: transparent;
  }

  .formulario-cliente label {
    font-size: 1rem;
    margin-bottom: 5px;
    display: block;
    color: #333;
  }

  .input-text {
    width: 100%;
    margin-bottom: 10px;
  }

  .cerrar-formulario {
    margin-top: 10px;
    background-color: #dc3545;
    color: white;
  }

  .cerrar-formulario:hover {
    background-color: #c82333;
  }

  .seleccionar-cliente {
    margin-top: 20px;
    background-color: #17a2b8;
    color: white;
    padding: 10px 20px;
    cursor: pointer;
  }

  .seleccionar-cliente:hover {
    background-color: #138496;
  }
</style>