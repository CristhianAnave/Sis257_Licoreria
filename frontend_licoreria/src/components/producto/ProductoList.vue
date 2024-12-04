<script setup lang="ts">
import type { Producto } from '@/models/producto';
import Dialog from 'primevue/dialog'
import http from '@/plugins/axios'
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';

const ENDPOINT = 'productos'
let productoess = ref<Producto[]>([])
const emit = defineEmits(['edit'])
const productoDelete = ref<Producto | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista(){
  productoess.value = await http.get(ENDPOINT).then((response)=> response.data)
}

function emitirEdicion(producto: Producto){
 emit('edit' , producto)
}

function mostrarEliminarConfirm(producto: Producto) {
  productoDelete.value = producto
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${productoDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}


onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista})
</script>

<template>
  <div>
    <table class="table-products">
      <thead>
        <tr>
          <th>Nro</th>
          <th>Código</th>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Tipo Unidad</th>
          <th>Precio Compra</th>
          <th>Precio Venta</th>
          <th>Stock</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productoess" :key="producto.id">
          <td>{{ index + 1 }}</td>
          <td>{{ producto.codigo }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.categoria.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.tipoUnidad }}</td>
          <td>{{ producto.precioCompra }}</td>
          <td>{{ producto.precioVenta }}</td>
          <td>{{ producto.stock }}</td>
           <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(producto)" style="color: black"/>
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(producto)" style="color: black;"/>
           </td>
        </tr>       
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ color:'black', width: '25rem', backgroundColor: '#35b847'  }"
    >
      <p style="color: black;">¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false "
          style="background-color: #ff0000; border-color: black; color: white;" 
        />
        <Button type="button" label="Eliminar" @click="eliminar" style="background-color: #00ff00; border-color: black;"/>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Estilo para la tabla */
.table-products {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0; /* Espacio fuera de la tabla */
}

/* Estilo para las celdas de la tabla */
.table-products th,
.table-products td {
  padding: 12px 15px; /* Aumenta el espacio entre las celdas */
  border: 1px solid rgb(0, 0, 0); /* Añade un borde suave a las celdas */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Espaciado entre las columnas */
.table-products th {
  background-color: #67eb67; /* Fondo gris claro para el encabezado */
  font-weight: bold; /* Negrita en los encabezados */
  text-transform: uppercase;
}

/* Estilo para las filas */
.table-products tr {
  background-color: #d3d1dbb7; /* Fondo alterno para las filas pares */
}
.table-products tr:hover {
  background-color: #77e21f; /* Fondo cuando se pasa el ratón sobre la fila */
}


</style>