<script lang="ts">
import { ref } from 'vue';
import http from '@/plugins/axios';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

export default {
  components: {
    Dialog,
    Button
  },
  setup() {
    const ventas = ref<any[]>([]);
    const mostrarDetalles = ref(false);
    const ventaSeleccionada = ref<any>(null);
    const mostrarVentas = ref(false);
    const noVentas = ref(false);

    const formatDate = (date: string) => {
      const d = new Date(date);
      return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}`;
    };

    const obtenerVentas = async () => {
      try {
        const response = await http.get('/ventas');
        ventas.value = response.data;
        noVentas.value = ventas.value.length === 0;
      } catch (error) {
        console.error('Error al obtener las ventas:', error);
      }
    };

    const verDetalles = async (ventaId: number) => {
      try {
        const response = await http.get(`/ventas/${ventaId}`);
        console.log(response.data); // Aquí es donde agregas el console.log
        ventaSeleccionada.value = response.data;
        mostrarDetalles.value = true;
      } catch (error) {
        console.error('Error al obtener los detalles de la venta:', error);
      }
    };

    const cerrarDetalles = () => {
      mostrarDetalles.value = false;
      ventaSeleccionada.value = null;
    };

    const mostrarTodasLasVentas = () => {
      obtenerVentas();
      mostrarVentas.value = true;
    };

    const ocultarVentas = () => {
      mostrarVentas.value = false;
    };

    return {
      ventas,
      mostrarDetalles,
      ventaSeleccionada,
      verDetalles,
      cerrarDetalles,
      mostrarVentas,
      mostrarTodasLasVentas,
      ocultarVentas,
      noVentas,
      formatDate
    };
  }
};
</script>

<template>
  <div class="m-8">
    <h1>Historial de Ventas</h1>

    <!-- Botones Mostrar Todo y Ocultar -->
    <div class="botones">
      <Button label="Mostrar Todo" @click="mostrarTodasLasVentas" class="mostrar-todo-btn" />
      <Button label="Ocultar" @click="ocultarVentas" class="ocultar-btn" />
    </div>

    <!-- Mostrar mensaje si no hay ventas -->
    <div v-if="noVentas && mostrarVentas" class="no-ventas">
      <p>No se han registrado ventas.</p>
    </div>

    <!-- Mostrar tabla de ventas si hay registros -->
    <div v-if="mostrarVentas && ventas.length > 0">
      <table class="ventas-table">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Monto Total</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(venta, index) in ventas" :key="venta.id">
            <td>{{ formatDate(venta.fechaCreacion) }}</td>
            <td>
              {{ venta.cliente.nombres }}
              {{ venta.cliente.apellidoPaterno }}
              {{ venta.cliente.apellidoMaterno }}
            </td>
            <td>{{ venta.montoTotal }}</td>
            <td>
              <Button label="Ver Detalles" @click="verDetalles(venta.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para mostrar los detalles de la venta -->
    <Dialog
      v-model:visible="mostrarDetalles"
      header="Detalles de la Venta"
      :style="{ width: '700px' }"
      :modal="true"
      :closable="false"
    >
      <div v-if="ventaSeleccionada">
        <h3>Productos de la Venta</h3>
        <table class="detalle-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(detalle, index) in ventaSeleccionada.detalles" :key="index">
              <td>{{ detalle.producto.nombre }}</td>
              <td>{{ detalle.cantidad }}</td>
              <td>{{ detalle.precioVenta }}</td>
              <td>{{ detalle.subtotal }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <Button
        label="Cerrar"
        icon="pi pi-times"
        @click="cerrarDetalles"
        class="cerrar-detalles-btn"
      />
    </Dialog>
  </div>
</template>
<style scoped>
.historial-view {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
}

.no-ventas {
  text-align: center;
  margin-top: 20px;
}

.ventas-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.ventas-table th, .ventas-table td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.ventas-table th {
  background-color: #1f141400;
}

.detalle-table {
  width: 100%;
  border-collapse: collapse;
}

.detalle-table th, .detalle-table td {
  padding: 10px 12px;
  border: 1px solid #ddd;
}

button {
  background-color: #28a745;
  color: rgb(255, 255, 255);
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.cerrar-detalles-btn {
  background-color: #dc3545;
  color: rgb(253, 253, 253);
  padding: 8px 16px;
  border: none;
  cursor: pointer;
}

.cerrar-detalles-btn:hover {
  background-color: #c82333;
}

.botones {
  margin-bottom: 20px;
}

.mostrar-todo-btn, .ocultar-btn {
  margin-right: 10px;
  padding: 8px 16px;
}

.mostrar-todo-btn {
  background-color: #007bff;
  color: white;
}

.ocultar-btn {
  background-color: #dc3545;
  color: white;
}
</style>