<script setup lang="ts">
  import type { Empleado } from '@/models/empleado';
  import Dialog from 'primevue/dialog'
  import http from '@/plugins/axios'
  import Button from 'primevue/button';
  import { computed, onMounted, ref } from 'vue';
  import { useAuthStore } from '@/stores';

  const ENDPOINT = 'empleados'
  let empleadoess = ref<Empleado[]>([])
  const emit = defineEmits(['edit'])
  const empleadoDelete = ref<Empleado | null>(null)
  const mostrarConfirmDialog = ref<boolean>(false)

  const authStore = useAuthStore() //
  const isAdmin = computed(() => authStore.role === 'Admin')

  async function obtenerLista() {
    empleadoess.value = await http.get(ENDPOINT).then((response) => response.data)
  }

  function emitirEdicion(empleado: Empleado) {
    emit('edit', empleado)
  }

  function mostrarEliminarConfirm(empleado: Empleado) {
    empleadoDelete.value = empleado
    mostrarConfirmDialog.value = true
  }

  async function eliminar() {
    await http.delete(`${ENDPOINT}/${empleadoDelete.value?.id}`)
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
          <th>CI</th>
          <th>Nombres</th>
          <th>APELLIDO PATERNO</th>
          <th>APELLIDO MATERNO</th>
          <th>CARGO</th>
          <th>USUARIO</th>
          <th>EMAIL</th>
          <th>DIRECCION</th>
          <th>CELULAR</th>
          <th>FECHA DE CONTRATACION</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(empleado, index) in empleadoess" :key="empleado.id">
          <td>{{ index + 1 }}</td>
          <td>{{ empleado.ci }}</td>
          <td>{{ empleado.nombres }}</td>
          <td>{{ empleado.apellidoPaterno }}</td>
          <td>{{ empleado.apellidoMaterno }}</td>
          <td>{{ empleado.cargo }}</td>
          <td>{{ empleado.usuarios.usuario }}</td>
          <td>{{ empleado.email }}</td>
          <td>{{ empleado.direccion }}</td>
          <td>{{ empleado.celular }}</td>
          <td>{{ empleado.fechaContratacion }}</td>
          <td>
            <Button v-if="isAdmin" icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(empleado)" />
            <Button v-if="isAdmin" icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(empleado)" />
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