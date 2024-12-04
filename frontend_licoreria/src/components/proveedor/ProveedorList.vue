<script setup lang="ts">
import type { Proveedor } from '@/models/proveedor';
import Dialog from 'primevue/dialog'
import http from '@/plugins/axios'
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';

const ENDPOINT = 'proveedores'
let proveedoress = ref<Proveedor[]>([])
const emit = defineEmits(['edit'])
const proveedorDelete = ref<Proveedor | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista(){
  proveedoress.value = await http.get(ENDPOINT).then((response)=> response.data)
}

function emitirEdicion(proveedor: Proveedor){
 emit('edit' , proveedor)
}

function mostrarEliminarConfirm(proveedor: Proveedor) {
  proveedorDelete.value = proveedor
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${proveedorDelete.value?.id}`)
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
    <table class="table-proveedor">
      <thead>
        <tr>
          <th>Nro</th>
          <th>Nit</th>
          <th>Razón Social</th>
          <th>Dirección</th>
          <th>Teléfono</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proveedor, index) in proveedoress" :key="proveedor.id">
          <td>{{ index + 1 }}</td>
          <td>{{ proveedor.nit }}</td>
          <td>{{ proveedor.razonSocial }}</td>
          <td>{{ proveedor.direccion }}</td>
          <td>{{ proveedor.telefono }}</td>
          <td>{{ proveedor.email }}</td>
           <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(proveedor)" style="color: black"/>
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(proveedor)" style="color: black;"/>
           </td>
        </tr>       
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{color:'black', width: '25rem', backgroundColor: '#35b847' }"
    >
      <p style="color: black;">¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
          style="background-color: #ff0000; border-color: black; color: white;" 
        />
        <Button type="button" label="Eliminar" @click="eliminar" style="background-color: #00ff00; border-color: black;"/>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Estilo para la tabla */
.table-proveedor {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0; /* Espacio fuera de la tabla */
}

/* Estilo para las celdas de la tabla */
.table-proveedor th,
.table-proveedor td {
  padding: 12px 15px; /* Aumenta el espacio entre las celdas */
  border: 1px solid rgb(0, 0, 0); /* Añade un borde suave a las celdas */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Espaciado entre las columnas */
.table-proveedor th {
  background-color: #67eb67; /* Fondo gris claro para el encabezado */
  font-weight: bold; /* Negrita en los encabezados */
  text-transform: uppercase;
}

/* Estilo para las filas */
.table-proveedor tr {
  background-color: #d3d1dbb7; /* Fondo alterno para las filas pares */
}
.table-proveedor tr:hover {
  background-color: #77e21f; /* Fondo cuando se pasa el ratón sobre la fila */
}




</style>