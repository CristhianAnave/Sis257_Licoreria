<script setup lang="ts">
  import CategoriaList from '@/components/categoria/CategoriaList.vue'
  import CategoriaSave from '@/components/categoria/CategoriaSave.vue'
  import Button from 'primevue/button'
  import { ref } from 'vue'

  //para que funcione los llamados a Save//
  const mostrarDialog = ref<boolean>(false)
  const categoriaListRef = ref<typeof CategoriaList | null>(null)
  const categoriaEdit = ref<any>(null)

  function handleCreate() {
    categoriaEdit.value = null
    mostrarDialog.value = true
  }

  function handleEdit(categoria: any) {
    categoriaEdit.value = categoria
    mostrarDialog.value = true
  }

  function handleCloseDialog() {
    mostrarDialog.value = false
  }

  function handleGuardar() {
    categoriaListRef.value?.obtenerLista()
  }
</script>

<template>
  <div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Categorías</h1>
    <Button label="Crear Nuevo" icon="pi pi plus" @click="handleCreate"
    style="background-color: #00ff00; border-color: black;"
    />
    <!-- boton que mostrara CREAR nuevo-->
    <!-- Todo esto para llamar a CategoriaSave-->
    <CategoriaList ref="categoriaListRef" @edit="handleEdit" />
    <CategoriaSave :mostrar="mostrarDialog" :categoria="categoriaEdit" :modoEdicion="!!categoriaEdit"
      @guardar="handleGuardar" @close="handleCloseDialog" />
    <!--Fin-->
  </div>
</template>

<style scoped></style>
