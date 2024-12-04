<script setup lang="ts">
import type { Cliente } from '@/models/cliente';
import Dialog from 'primevue/dialog'
import http from '@/plugins/axios'
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';

const ENDPOINT = 'clientes'
let clienteess = ref<Cliente[]>([])
const emit = defineEmits(['edit'])
const clienteDelete = ref<Cliente | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista(){
  clienteess.value = await http.get(ENDPOINT).then((response)=> response.data)
}

function emitirEdicion(cliente: Cliente){
 emit('edit' , cliente)
}

function mostrarEliminarConfirm(cliente: Cliente) {
  clienteDelete.value = cliente
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${clienteDelete.value?.id}`)
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
    <table class="table-cliente">
      <thead>
        <tr>
          <th>Nro</th>
          <th>C.I</th>
          <th>Nombres</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Email</th>
          <th>Celular</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clienteess" :key="cliente.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.ci }}</td>
          <td>{{ cliente.nombres }}</td>
          <td>{{ cliente.apellidoPaterno }}</td>
          <td>{{ cliente.apellidoMaterno }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.celular }}</td>
           <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cliente)" style="color: black"/>
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(cliente)" style="color: black;"/>
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
.table-cliente {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0; /* Espacio fuera de la tabla */
}

/* Estilo para las celdas de la tabla */
.table-cliente  th,
.table-cliente  td {
  padding: 12px 15px; /* Aumenta el espacio entre las celdas */
  border: 1px solid rgb(0, 0, 0); /* Añade un borde suave a las celdas */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Espaciado entre las columnas */
.table-cliente  th {
  background-color: #67eb67; /* Fondo gris claro para el encabezado */
  font-weight: bold; /* Negrita en los encabezados */
  text-transform: uppercase;
}

/* Estilo para las filas */
.table-cliente  tr {
  background-color: #d3d1dbb7; /* Fondo alterno para las filas pares */
}
.table-cliente  tr:hover {
  background-color: #77e21f; /* Fondo cuando se pasa el ratón sobre la fila */
}



</style>