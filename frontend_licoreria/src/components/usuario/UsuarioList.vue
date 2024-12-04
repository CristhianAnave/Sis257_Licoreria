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
    <table class="table-usuario">
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
            <Button v-if="isAdmin" icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(usuario)" style="color: black"/>
            <!--para editar 1) @click="etc-->
            <Button v-if="isAdmin" icon="pi pi-trash" aria-label="Eliminar" text
              @click="mostrarEliminarConfirm(usuario)" style="color: black;"/>
          </td>
        </tr>
      </tbody>
    </table>
    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{color:'black', width: '25rem', backgroundColor: '#35b847'  }">
      
      <p style="color: black;">¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false"
        style="background-color: #ff0000; border-color: black; color: white;" 
        />
        <Button type="button" label="Eliminar" @click="eliminar" style="background-color: #00ff00; border-color: black;"/>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Estilo para la tabla */
.table-usuario {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0; /* Espacio fuera de la tabla */
}

/* Estilo para las celdas de la tabla */
.table-usuario th,
.table-usuario td {
  padding: 12px 15px; /* Aumenta el espacio entre las celdas */
  border: 1px solid rgb(0, 0, 0); /* Añade un borde suave a las celdas */
  text-align: left; /* Alinea el texto a la izquierda */
}

/* Espaciado entre las columnas */
.table-usuario th {
  background-color: #67eb67; /* Fondo gris claro para el encabezado */
  font-weight: bold; /* Negrita en los encabezados */
  text-transform: uppercase;
}

/* Estilo para las filas */
.table-usuario tr {
  background-color: #d3d1dbb7; /* Fondo alterno para las filas pares */
}
.table-usuario tr:hover {
  background-color: #77e21f; /* Fondo cuando se pasa el ratón sobre la fila */
}

</style>
