<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import http from '@/plugins/axios'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { onMounted, ref } from 'vue'

const ENDPOINT = 'categoria'
let categorias = ref<Categoria[]>([])
const emit = defineEmits(['edit'])   //para editar 1)
const categoriaDelete = ref<Categoria | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)

async function obtenerLista() {
  categorias.value = await http.get(ENDPOINT).then(response => response.data)
}

function emitirEdicion(categoria: Categoria) {       //para editar 1)
  emit('edit', categoria)
}

function mostrarEliminarConfirm(categoria: Categoria) {
  categoriaDelete.value = categoria
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${categoriaDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}


onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <table class="table-categorium">
      <thead>
        <tr>
          <th>Nro</th>
          <th>Nombre</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(categoria, index) in categorias" :key="categoria.id">
          <td>{{ index + 1 }}</td>
          <td>{{ categoria.nombre }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(categoria)" style="color: black"/>  <!--para editar 1) @click="etc-->
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(categoria)" style="color: black;"/>
          </td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{color:'black', width: '25rem' , backgroundColor: '#35b847' }"
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
.table-products {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0; /* Espacio fuera de la tabla */
}

/* Estilo para las celdas de la tabla */
.table-categorium th,
.table-categorium td {
  padding: 12px 15px; /* Aumenta el espacio entre las celdas */
  border: 1px solid rgb(0, 0, 0); /* Añade un borde suave a las celdas */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Espaciado entre las columnas */
.table-categorium th {
  background-color: #67eb67; /* Fondo gris claro para el encabezado */
  font-weight: bold; /* Negrita en los encabezados */
  text-transform: uppercase;
}

/* Estilo para las filas */
.table-categorium tr {
  background-color: #d3d1dbb7; /* Fondo alterno para las filas pares */
}
.table-categorium tr:hover {
  background-color: #77e21f; /* Fondo cuando se pasa el ratón sobre la fila */
}


</style>
