<script setup lang="ts">
import ProveedorList from '@/components/proveedor/ProveedorList.vue';
import ProveedorSave from '@/components/proveedor/ProveedorSave.vue';
import Button from 'primevue/button';
import { ref } from 'vue';

const mostrarDialog = ref<boolean>(false)
const proveedorListRef = ref<typeof ProveedorList | null>(null)
const proveedorEdit = ref<any>(null)

function handleCreate(){
  proveedorEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(proveedor: any){
 proveedorEdit.value = proveedor
 mostrarDialog.value = true
}

function handleCloseDialog(){
  mostrarDialog.value = false
}

function handleGuardar(){
  proveedorListRef.value?.obtenerLista()
}
</script>
<template>
  <div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Proveedores</h1> 
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" style="background-color: #00ff00; border-color: black;" />
    <ProveedorList ref="proveedorListRef" @edit="handleEdit"/>
    <ProveedorSave
     :mostrar="mostrarDialog"
     :proveedor="proveedorEdit"
     :modoEdicion="!!proveedorEdit"
     @guardar="handleGuardar"
     @close="handleCloseDialog"
    />

  </div>
</template>

<style scoped ></style>