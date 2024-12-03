<script setup lang="ts">
  import ProductoList from '@/components/producto/ProductoList.vue';
  import ProductoSave from '@/components/producto/ProductoSave.vue';
  import Button from 'primevue/button';
  import { ref } from 'vue';

  const mostrarDialog = ref<boolean>(false)
  const productoListRef = ref<typeof ProductoList | null>(null)
  const productoEdit = ref<any>(null)

  function handleCreate() {
    productoEdit.value = null
    mostrarDialog.value = true
  }

  function handleEdit(producto: any) {
    productoEdit.value = producto
    mostrarDialog.value = true
  }

  function handleCloseDialog() {
    mostrarDialog.value = false
  }

  function handleGuardar() {
    productoListRef.value?.obtenerLista()
  }
</script>
<template>
  <div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Productos</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" 
    style="background-color: #00ff00; border-color: black;" />
    <ProductoList ref="productoListRef" @edit="handleEdit" />
     <ProductoSave
     :mostrar="mostrarDialog"
     :producto="productoEdit"
     :modoEdicion="!!productoEdit"
     @guardar="handleGuardar"
     @close="handleCloseDialog"
    /> 

  </div>
</template>

<style scoped>

</style>