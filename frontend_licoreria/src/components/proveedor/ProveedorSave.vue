<script setup lang="ts">
import type { Proveedor } from '@/models/proveedor'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'proveedores'
const props = defineProps({
  mostrar: Boolean,
  proveedor: {
    type: Object as () => Proveedor,
    default: () => ({}) as Proveedor,
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

const proveedor = ref<Proveedor>({ ...props.proveedor })
watch(
  () => props.proveedor,
  (newVal) => {
    proveedor.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      nit: proveedor.value.nit,
      razonSocial: proveedor.value.razonSocial,
      direccion: proveedor.value.direccion,
      telefono: proveedor.value.telefono,
      email: proveedor.value.email,

    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${proveedor.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    proveedor.value = {} as Proveedor
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
      :header="props.modoEdicion ? 'Editar Proveedor' : 'Crear Proveedor'"
      :style="{ backgroundColor: '#35b847', color: 'black' }"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="nit" class="font-semibold w-4">Nit</label>
        <InputText
          id="nit"
          v-model="proveedor.nit"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="razonSocial" class="font-semibold w-4">RazonSocial</label>
        <InputText
          id="razonSocial"
          v-model="proveedor.razonSocial"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-4">Direccion</label>
        <InputText
          id="direccion"
          v-model="proveedor.direccion"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="telefono" class="font-semibold w-4">Telefono</label>
        <InputText
          id="telefono"
          v-model="proveedor.telefono"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-4">Email</label>
        <InputText
          id="email"
          v-model="proveedor.email"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
          style="background-color: #ff0000; border-color: black; color: white;" 
        ></Button>
        <Button
          type="button"
          label="Guardar"
          icon="pi pi-save"
          @click="handleSave"
          style="background-color: #00ff00; border-color: black; color: black;" 
        ></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped>
/* Estilo para los inputs (campos de formulario) */
.custom-input {
  background-color: rgb(0, 0, 0) !important; /* Fondo amarillo para los campos */
  border: 1px solid #ccc; /* Borde gris para los campos */
  color: rgb(255, 252, 252);  /* Color del texto en los inputs */
  padding: 0.5rem;
}

.custom-input:focus {
  border-color: #b3ff00;  /* Color de borde azul cuando el campo está en foco */
  outline: none;  /* Quitar el borde de enfoque predeterminado */
}


</style>
