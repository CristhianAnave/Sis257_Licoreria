<script lang="ts">
  import { useCartStore } from '@/stores/cart';
  import { computed, ref, onMounted } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import http from '@/plugins/axios';
  import { useAuthStore } from '@/stores/index';
  import  QRCode  from 'qrcode';
  import { QrcodeStream } from 'vue-qrcode-reader'; // Componente para escanear el QR

  export default {
    components: {
      InputText,
      Button,
      Dialog,
      QRCode,
      QrcodeStream, // Componente para escanear el QR
    },
    setup() {
      const cartStore = useCartStore();
      
      const mostrarFormularioCliente = ref(false);

      // Estado para almacenar los detalles del cliente seleccionado
      const clienteSeleccionado = ref({
        id: null,
        ci: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        email: '',
        celular: ''
      });

      // Lista de clientes para mostrar en el select
      const clientes = ref<any[]>([]);
      const searchCI = ref(''); // Para el select de C.I.

      // Datos para el QR
      const qrData = ref<string | null>(null); 
      const ventaRegistrada = ref(false); // Indica si la venta fue registrada

      // Cargar clientes del backend
      const obtenerClientes = async () => {
        try {
          const response = await http.get('/clientes');
          clientes.value = response.data;
        } catch (error) {
          console.error('Error al obtener los clientes', error);
        }
      };

      onMounted(() => {
        obtenerClientes();
      });

      // Cuando se selecciona un C.I., se obtiene la información del cliente
      function seleccionarClientePorCI() {
        const clienteEncontrado = clientes.value.find(cliente => cliente.ci === searchCI.value);
        if (clienteEncontrado) {
          clienteSeleccionado.value = clienteEncontrado;
        } else {
          alert('Cliente no encontrado');
        }
      }

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
//Duncion registrar venta dfunciona
function registrarVenta() {
  if (!clienteSeleccionado.value.id) {
    alert('Debe seleccionar un cliente para completar la venta.');
    return;
  }

  if (cartStore.productos.length === 0) {
    alert('El carrito está vacío. Agrega productos para realizar la venta.');
    return;
  }

  const authStore = useAuthStore();
  const token = authStore.token;
  const userId = authStore.userId;

  if (!userId) {
    console.error('El ID del usuario no está disponible.');
    return;
  }

  if (!token) {
    alert('Debe iniciar sesión para completar la venta.');
    return;
  }

  // Calcular el monto total a partir de los productos en el carrito (igual que en registrarVentaQr)
  const montoTotal = totalCarrito.value;  // totalCarrito es la propiedad computada que ya calcula el monto

  const ventaData = {
    idUsuario: userId,
    idCliente: clienteSeleccionado.value.id,
    montoTotal: montoTotal,  // Usamos el montoTotal calculado
  };

  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };

  // Registrar la venta
  http.post('/ventas', ventaData, config)
    .then(response => {
      const idVenta = response.data.id;

      // Crear los detalles de la venta
      const detalleVentaData = cartStore.productos.map(producto => {
        const cantidad = typeof producto.cantidad === 'number' ? producto.cantidad : parseInt(producto.cantidad, 10);
        const precioVenta = typeof producto.precioVenta === 'number' ? producto.precioVenta : parseFloat(producto.precioVenta);
        const subtotal = cantidad * precioVenta;

        return {
          idProducto: producto.id,
          precioVenta: precioVenta,
          cantidad: cantidad,
          subtotal: subtotal,
          idVenta: idVenta,  // Usamos el idVenta que nos devuelve la creación de la venta
        };
      });

      // Verificar que los datos del carrito sean válidos
      if (detalleVentaData.some(detalle => !detalle.idProducto || detalle.cantidad <= 0 || detalle.precioVenta <= 0)) {
        console.error('Datos inválidos en detalleVentaData', detalleVentaData);
        alert('Los datos de los productos en el carrito no son válidos.');
        return;
      }

      // Registrar los detalles de la venta en el backend
      return http.post('/detalleventa', detalleVentaData, config);
    })
    .then(() => {
      cartStore.vaciarCarrito();
      alert('Venta registrada con éxito');
    })
    .catch(error => {
      if (error.response) {
        console.error('Error de backend:', error.response.data);
        alert(`Error del servidor: ${error.response.data.message || 'Intente nuevamente.'}`);
      } else {
        console.error('Error desconocido:', error);
        alert('Hubo un error al conectar con el servidor. Intente nuevamente.');
      }
    });
}






































      // Función para generar el QR
      function generarQR() {
        if (!clienteSeleccionado.value.id || cartStore.productos.length === 0) {
          alert('Debe seleccionar un cliente y agregar productos al carrito para generar el QR');
          return;
        }

        const ventaData = {
          idUsuario: useAuthStore().userId,
          idCliente: clienteSeleccionado.value.id,
          montoTotal: totalCarrito.value,
        };

        // Convertir la información de la venta a un string JSON
        const qrString = JSON.stringify(ventaData);
        
        console.log('Generando QR con el siguiente dato:', qrString);
        // Usar la librería QRCode para generar el QR
        QRCode.toDataURL(qrString, (err: Error | null, url: string) => {
          if (err) {
            console.error('Error al generar el QR:', err);
            alert('Hubo un error al generar el QR.');
          } else {
            qrData.value = url;
            console.log('QR generado:', url);
          }
        });
      }

      // Función para registrar la venta con los datos escaneados del QR
      function registrarVentaQr(data: any) {
  if (!data.idCliente || !data.idUsuario || !data.montoTotal) {
    alert('Datos del QR no válidos');
    return;
  }

  const authStore = useAuthStore();
  const token = authStore.token;
  const userId = authStore.userId;

  if (!userId) {
    console.error('El ID del usuario no está disponible.');
    return;
  }

  if (!token) {
    alert('Debe iniciar sesión para completar la venta.');
    return;
  }

  const ventaData = {
    idUsuario: data.idUsuario,
    idCliente: data.idCliente,
    montoTotal: data.montoTotal,
  };

  const config = {
    headers: {
      'Authorization': `Bearer ${useAuthStore().token}`,
      'Content-Type': 'application/json',
    },
  };

  http.post('/ventas', ventaData, config)
    .then(response => {
      const idVenta = response.data.id;

      const detalleVentaData = cartStore.productos.map(producto => ({
        idProducto: producto.id,
        precioVenta: +producto.precioVenta,
        cantidad: producto.cantidad,
        subtotal: producto.cantidad * producto.precioVenta,
        idVenta: Number(idVenta),
      }));

      // Verificar que los datos del carrito sean válidos
      if (detalleVentaData.some(detalle => !detalle.idProducto || detalle.cantidad <= 0 || detalle.precioVenta <= 0)) {
        console.error('Datos inválidos en detalleVentaData', detalleVentaData);
        alert('Los datos de los productos en el carrito no son válidos.');
        return;
      }

      // Registrar los detalles de la venta en el backend
      return http.post('/detalleventa', detalleVentaData, config);
    })
    .then(() => {
      cartStore.vaciarCarrito();
      alert('Venta registrada con éxito');
      ventaRegistrada.value = true; // Marcamos que la venta fue registrada
      qrData.value = null;  // Eliminar el QR de la vista
    })
    .catch(error => {
      if (error.response) {
        console.error('Error de backend:', error.response.data);
        alert(`Error del servidor: ${error.response.data.message || 'Intente nuevamente.'}`);
      } else {
        console.error('Error desconocido:', error);
        alert('Hubo un error al conectar con el servidor. Intente nuevamente.');
      }
    });
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

      function aceptarCliente() {
        if (clienteSeleccionado.value.id) {
          cartStore.seleccionarCliente(clienteSeleccionado.value.id);  // Guarda el idCliente en el store
          mostrarFormularioCliente.value = false; // Cierra el formulario
        } else {
          alert('Debe seleccionar un cliente');
        }
      }

      // Función para manejar el escaneo del QR
      function onDecode(decodedString: string) {
        try {
          const data = JSON.parse(decodedString);
          registrarVentaQr(data);  // Registrar la venta con los datos escaneados
        } catch (e) {
          console.error('Error al procesar el QR:', e);
        }
      }

      return {
        cartStore,
        totalCarrito,
        eliminarProducto,
        vaciarCarrito,
        aumentarCantidad,
        disminuirCantidad,
        registrarVenta,
        clienteSeleccionado,
        formatCurrency,
        mostrarFormulario,
        cerrarFormulario,
        mostrarFormularioCliente,
        clientes,
        searchCI,
        seleccionarClientePorCI,
        aceptarCliente,
        qrData,      // Datos para el QR
        ventaRegistrada,  // Estado de si la venta fue registrada
        generarQR,  // Función para generar el QR
        onDecode,   // Función para manejar el escaneo del QR
      };
    },
  };
</script>

<template>
    <div class="m-8" >
      <h1>Carrito de Compras</h1>
         
    <div v-if="cartStore.productos.length === 0" class="empty-cart">
      <p>Tu carrito está vacío. ¡Agrega algunos productos!</p>
    </div>
   
    <div v-else>
      <table class="cart-table">
        <thead>
          <tr>
            <th>N°</th>
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
          <tr v-for="(producto, index) in cartStore.productos" :key="producto.id">
            <td>{{ index + 1 }}</td>
            <td>{{ producto.nombre }}</td>
            <td>{{ producto.categoria.nombre }}</td>
            <td>{{ producto.descripcion }}</td>
            <td>
              <div class="cantidad-controls">
                <button @click="disminuirCantidad(producto.id)" :disabled="producto.cantidad === 1"
                  class="cantidad-btn restar">-</button>
                <span>{{ producto.cantidad }}</span>
                <button @click="aumentarCantidad(producto.id, producto.stock)" class="cantidad-btn">+</button>
              </div>
            </td>
            <td>Bs {{ formatCurrency(producto.precioVenta) }}</td>
            <td>{{ formatCurrency(producto.precioVenta * producto.cantidad) }}</td>
            <td>
              <button @click="eliminarProducto(producto.id)" class="eliminar-btn">Eliminar</button>
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
        <button @click="generarQR" class="generar-qr">Generar QR</button>
      </div>

      <div v-if="qrData">
        <img :src="qrData" alt="QR Code" />
      </div>
    </div>

    <button @click="mostrarFormulario" class="seleccionar-cliente">Seleccionar Cliente</button>

    <Dialog v-model:visible="mostrarFormularioCliente" header="Formulario de Cliente" :style="{ width: '700px' }"
      :modal="true" :closable="false">
      <div class="formulario-cliente">
        <h3>Buscar Cliente por C.I.</h3>

        <select v-model="searchCI" @change="seleccionarClientePorCI" class="ci-selector">
          <option value="">Seleccionar C.I.</option>
          <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.ci">{{ cliente.ci }}</option>
        </select>

        <div v-if="clienteSeleccionado.id">
          <!-- Estructura de campos con labels encima -->
          <div class="form-group">
            <label for="ci">C.I:</label>
            <InputText id="ci" v-model="clienteSeleccionado.ci" disabled />
          </div>

          <!-- Nombres, Apellido Paterno y Apellido Materno en la misma fila -->
          <div class="form-group row">
            <div class="col">
              <label for="nombres">Nombres:</label>
              <InputText id="nombres" v-model="clienteSeleccionado.nombres" disabled />
            </div>
            <div class="col">
              <label for="apellidoPaterno">Apellido Paterno:</label>
              <InputText id="apellidoPaterno" v-model="clienteSeleccionado.apellidoPaterno" disabled />
            </div>
            <div class="col">
              <label for="apellidoMaterno">Apellido Materno:</label>
              <InputText id="apellidoMaterno" v-model="clienteSeleccionado.apellidoMaterno" disabled />
            </div>
          </div>

          <div class="form-group row">
            <div class="col">
              <label for="email">Email:</label>
              <InputText id="email" v-model="clienteSeleccionado.email" disabled />
            </div>
            <div class="col">
              <label for="celular">Celular:</label>
              <InputText id="celular" v-model="clienteSeleccionado.celular" disabled />
            </div>
          </div>
        </div>

        <!-- Botón Cerrar con estilo actualizado -->
        <div class="form-buttons">
          <Button label="Cerrar" icon="pi pi-times" @click="cerrarFormulario" class="cerrar-formulario" />
          <Button label="Aceptar" class="aceptar-formulario" @click="aceptarCliente" />
        </div>
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

  .cart-table th,
  .cart-table td {
    background-color: transparent !important;
    padding: 12px 15px;
    text-align: left;
  }

  .total {
    margin-top: 15px;
    text-align: right;
  }

  .botones-acciones {
    margin-top: 20px;
    text-align: center;
  }

  button {
    background-color: #28a745;
    color: white;
    border: 1px solid #000;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin: 5px;
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

  .eliminar-btn {
    background-color: #28a745;
    color: white;
    border: none;
  }

  .eliminar-btn:hover {
    background-color: #fc0019;
  }

  .cantidad-controls {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .cantidad-btn {
    padding: 5px 10px;
    border: 1px solid #000;
  }

  /* Estilo para mantener la estructura en 3 campos arriba y 2 abajo */
  .formulario-cliente {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .ci-selector {
    width: 150%;
    max-width: 150px;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group.row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .col {
    width: 31%;
    /* Ajuste para que los tres campos quepan en una fila */
  }

  label {
    margin-bottom: 5px;
    font-weight: bold;
  }

  .dialog-content {
    max-width: 700px;
  }

  /* Estilo para el botón cerrar sin cambio de color al pasar el cursor */
  .form-buttons {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
    margin-top: 20px;
  }

  .aceptar-formulario {
    background-color: #dc3545;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .aceptar-formulario:hover {
    background-color: #c82333;
  }

  .cerrar-formulario {
    background-color: #28a745;
    color: white;
    padding: 8px 16px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: auto;
    max-width: 200px;
  }

  .cerrar-formulario:hover {
    background-color: #218838;
  }

  /* Estilo para el botón Generar QR */
  .generar-qr {
    background-color: #ff9800; /* Color naranja */
    color: white;
    border: 1px solid #ff9800;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    margin: 5px;
  }

  .generar-qr:hover {
    background-color: #fb8c00; /* Naranja más oscuro */
    border: 1px solid #fb8c00;
  }
</style>