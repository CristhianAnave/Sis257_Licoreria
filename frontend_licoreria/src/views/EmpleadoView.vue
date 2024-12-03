<script setup lang="ts">
  import EmpleadoList from '@/components/empleado/EmpleadoList.vue';
  import EmpleadoSave from '@/components/empleado/EmpleadoSave.vue';
  import { useAuthStore } from '@/stores';
  import Button from 'primevue/button';
  import { computed, ref } from 'vue';

  const mostrarDialog = ref<boolean>(false)
  const empleadoListRef = ref<typeof EmpleadoList | null>(null)
  const empleadoEdit = ref<any>(null)

  // Obtenemos el estado del usuario autenticado
  const authStore = useAuthStore()
  const isAdmin = computed(() => authStore.role === 'Admin')  //

  function handleCreate() {
    empleadoEdit.value = null
    mostrarDialog.value = true
  }

  function handleEdit(empleado: any) {
    empleadoEdit.value = empleado
    mostrarDialog.value = true
  }

  function handleCloseDialog() {
    mostrarDialog.value = false
  }

  function handleGuardar() {
    empleadoListRef.value?.obtenerLista()
  }
</script>
<template>
  <<div class="m-8">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Empleados</h1>
    <Button v-if="isAdmin" label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate"
      style="background-color: #00ff00; border-color: black;" />
    <EmpleadoList ref="empleadoListRef" @edit="handleEdit" />
    <EmpleadoSave :mostrar="mostrarDialog" :empleado="empleadoEdit" :modoEdicion="!!empleadoEdit"
      @guardar="handleGuardar" @close="handleCloseDialog" />

    </div>
</template>

<style scoped></style>