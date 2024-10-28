<script setup lang="ts">
import type { Cliente } from '@/models/clientes'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'clientes'
let clientes = ref<Cliente[]>([])

async function obtenerLista() {
  clientes.value = await http.get(ENDPOINT).then(response => response.data)
}
onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>
<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro</th>
          <th>Ci</th>
          <th>Nombres</th>
          <th>Apellido Paterno</th>
          <th>Apellido Materno</th>
          <th>Email</th>
          <th>Celular</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="cliente.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.ci }}</td>
          <td>{{ cliente.nombres }}</td>
          <td>{{ cliente.apellidoPaterno }}</td>
          <td>{{ cliente.apellidoMaterno }}</td>
          <td>{{ cliente.email }}</td>
          <td>{{ cliente.celular }}</td>

          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text />
            <Button icon="pi pi-trash" aria-label="Eliminar" text />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
