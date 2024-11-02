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
    <table>
      <thead>
        <tr>
          <th>Nro</th>
          <th>Codigo</th>
          <th>Nombre</th>
          <th>Categoria</th>
          <th>Descripcion</th>
          <th>TipoUnidad</th>
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
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(producto)"/>
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(producto)" />
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