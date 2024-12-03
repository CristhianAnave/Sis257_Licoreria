<script setup lang="ts">
  import UsuarioList from '@/components/usuario/UsuarioList.vue'
  import UsuarioSave from '@/components/usuario/UsuarioSave.vue'
  import { useAuthStore } from '@/stores';
  import Button from 'primevue/button'
  import { computed, ref } from 'vue'

  //para que funcione los llamados a Save//
  const mostrarDialog = ref<boolean>(false)
  const usuarioListRef = ref<typeof UsuarioList | null>(null)
  const usuarioEdit = ref<any>(null)

  // Obtenemos el estado del usuario autenticado
  const authStore = useAuthStore()
  const isAdmin = computed(() => authStore.role === 'Admin')  // Verificamos si el usuario tiene rol de Admin

  function handleCreate() {
    usuarioEdit.value = null
    mostrarDialog.value = true
  }

  function handleEdit(usuario: any) {
    usuarioEdit.value = usuario
    mostrarDialog.value = true
  }

  function handleCloseDialog() {
    mostrarDialog.value = false
  }

  function handleGuardar() {
    usuarioListRef.value?.obtenerLista()
  }
</script>

<template>
  <div class="m-8 ">
    <h1 style="font-family: 'Times New Roman', sans-serif; font-weight: bold; color:white">Usuarios</h1>
    <Button v-if="isAdmin" label="Crear Nuevo" icon="pi pi plus" @click="handleCreate"
      style="background-color: #00ff00; border-color: black;" />
    <UsuarioList ref="usuarioListRef" @edit="handleEdit" />
    <UsuarioSave :mostrar="mostrarDialog" :usuario="usuarioEdit" :modoEdicion="!!usuarioEdit" @guardar="handleGuardar"
      @close="handleCloseDialog" />
    <!--Fin-->
  </div>
</template>

<style scoped></style>
