<script setup lang="ts">
import type { Usuario } from '@/models/usuario'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'usuarios'
const props = defineProps({
  mostrar: Boolean,
  usuario: {
    type: Object as () => Usuario,
    default: () => ({}) as Usuario,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

const usuario = ref<Usuario>({ ...props.usuario })

//aumentado
watch(
  () => props.modoEdicion,
  (newVal) => {
    if (!newVal) {
      usuario.value.clave = 'hola123'
    }
  },
)


watch(
  () => props.usuario,
  newVal => {
    usuario.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      usuario: usuario.value.usuario,
      clave: 'hola123',
      rol: usuario.value.rol,
      premium: usuario.value.premium

    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${usuario.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    usuario.value = {} as Usuario
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="usuario" class="font-semibold w-4">Usuario</label>
        <InputText
          id="usuario"
          v-model="usuario.usuario"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div v-if="!props.modoEdicion" class="flex items-center gap-4 mb-4">
        <label for="clave" class="font-semibold w-4">Clave</label>
        <InputText         
          id="clave"
          v-model="usuario.clave"
          class="flex-auto"
          autocomplete="off"
          autofocus
          :value="'hola123'"
          readonly
        />                
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="rol" class="font-semibold w-4">Rol</label>
        <InputText
          id="rol"
          v-model="usuario.rol"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="premium" class="font-semibold w-4">PREMIUM</label>
        <input
          id="premium-yes"
          v-model="usuario.premium"
          type="radio"
          value="true"
          class="flex-auto"
          autocomplete="off"
        />
        <label for="premium-yes">Sí</label>
        <input 
    id="premium-no" 
    v-model="usuario.premium" 
    type="radio" 
    value="false" 
    class="flex-auto"
    autocomplete="off" 
  />
  <label for="premium-no">No</label>
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
