<script setup lang="ts">
  import type { Usuario } from '@/models/usuario'
  import http from '@/plugins/axios'
  import Dialog from 'primevue/dialog'
  import Button from 'primevue/button'
  import { computed, onMounted, ref } from 'vue'
  import { useAuthStore } from '@/stores/index'  // Importamos el store de autenticaci

  const ENDPOINT = 'usuarios'
  let usuarios = ref<Usuario[]>([])
  const emit = defineEmits(['edit'])   //para editar 1)
  const usuarioDelete = ref<Usuario | null>(null)
  const mostrarConfirmDialog = ref<boolean>(false)

  const authStore = useAuthStore() //para boorrar si no funciona
  const isAdmin = computed(() => authStore.role === 'Admin')

  async function obtenerLista() {
    usuarios.value = await http.get(ENDPOINT).then(response => response.data)
  }

  function emitirEdicion(usuario: Usuario) {       //para editar 1)
    emit('edit', usuario)
  }

  function mostrarEliminarConfirm(usuario: Usuario) {
    usuarioDelete.value = usuario
    mostrarConfirmDialog.value = true
  }

  async function eliminar() {
    await http.delete(`${ENDPOINT}/${usuarioDelete.value?.id}`)
    obtenerLista()
    mostrarConfirmDialog.value = false
  }


  onMounted(() => {
    obtenerLista()
  })
  defineExpose({ obtenerLista })
</script>

<template>
  <div v-if="!isAdmin" class="text-center text-danger">
    Usted no tiene autorización para ver esta tabla.
  </div>
  <div v-else>
    <table>
      <thead>
        <tr>
          <th>Nro</th>
          <th>USUARIO</th>
          <th>ROL</th>
          <th>PREMIUM</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(usuario, index) in usuarios" :key="usuario.id">
          <td>{{ index + 1 }}</td>
          <td>{{ usuario.usuario }}</td>
          <td>{{ usuario.rol }}</td>
          <td>{{ usuario.premium }}</td>
          <td>
            <Button v-if="isAdmin" icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(usuario)" />
            <!--para editar 1) @click="etc-->
            <Button v-if="isAdmin" icon="pi pi-trash" aria-label="Eliminar" text
              @click="mostrarEliminarConfirm(usuario)" />
          </td>
        </tr>
      </tbody>
    </table>
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
