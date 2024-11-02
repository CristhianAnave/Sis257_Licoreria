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
    <table>
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
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cliente)"/>
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(cliente)" />
           </td>
        </tr>       
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>