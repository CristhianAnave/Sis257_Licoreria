<script setup lang="ts">
import type { Cliente } from '@/models/cliente'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'clientes'
const props = defineProps({
  mostrar: Boolean,
  cliente: {
    type: Object as () => Cliente,
    default: () => ({}) as Cliente,
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

const cliente = ref<Cliente>({ ...props.cliente })
watch(
  () => props.cliente,
  (newVal) => {
    cliente.value = { ...newVal }
  },
)

async function handleSave() {
  try {
    const body = {
      ci: cliente.value.ci,
      nombres: cliente.value.nombres,
      apellidoPaterno: cliente.value.apellidoPaterno,
      apellidoMaterno: cliente.value.apellidoMaterno,
      email: cliente.value.email,
      celular: cliente.value.celular,
   }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cliente.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cliente.value = {} as Cliente
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
      :header="props.modoEdicion ? 'Editar Cliente' : 'Crear Cliente'"
      :style="{ backgroundColor: '#35b847', color: 'black' }"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="ci" class="font-semibold w-4">Ci</label>
        <InputText
          id="ci"
          v-model="cliente.ci"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombres" class="font-semibold w-4">Nombres</label>
        <InputText
          id="nombres"
          v-model="cliente.nombres"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellidoPaterno" class="font-semibold w-4">ApellidoPaterno</label>
        <InputText
          id="apellidoPaterno"
          v-model="cliente.apellidoPaterno"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellidoMaterno" class="font-semibold w-4">Apellido Materno</label>
        <InputText
          id="apellidoMaterno"
          v-model="cliente.apellidoMaterno"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-4">Email</label>
        <InputText
          id="email"
          v-model="cliente.email"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="celular" class="font-semibold w-4">Celular</label>
        <InputText
          id="celular"
          v-model="cliente.celular"
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
