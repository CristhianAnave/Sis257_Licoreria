<script setup lang="ts">

  import type { Empleado } from '@/models/empleado'
  import type { Usuario } from '@/models/usuario'
  import http from '@/plugins/axios'
  import Button from 'primevue/button'
  import Dialog from 'primevue/dialog'
  import InputText from 'primevue/inputtext'
  import Select from 'primevue/select'
  import { computed, onMounted, ref, watch } from 'vue'

  const ENDPOINT = 'empleados'
  const props = defineProps({
    mostrar: Boolean,
    empleado: {
      type: Object as () => Empleado,
      default: () => ({}) as Empleado,
    },
    modoEdicion: Boolean,
  })
  const emit = defineEmits(['guardar', 'close'])

  const usuarios = ref<Usuario[]>([]) // para que aparezcas categorias en el groubox

  const dialogVisible = computed({
    get: () => props.mostrar,
    set: value => {
      if (!value) emit('close')
    },
  })


  const empleado = ref<Empleado>({ ...props.empleado })

  watch(
    () => props.empleado,
    (newVal) => {
      empleado.value = { ...newVal }
    },
  )
  const usuariosConOpcionVacia = computed(() => {
    return [{ id: 0, usuario: 'Sin Usuario' }, ...usuarios.value]
  })

  async function obtenerUsuarios() {
    usuarios.value = await http.get('usuarios').then((response) => response.data)
  }

  async function handleSave() {
    try {
      const body = {
        idUsuarios: empleado.value.idUsuarios || 0,
        ci: empleado.value.ci,
        nombres: empleado.value.nombres,
        apellidoPaterno: empleado.value.apellidoPaterno,
        apellidoMaterno: empleado.value.apellidoMaterno,
        cargo: empleado.value.cargo,
        email: empleado.value.email,
        direccion: empleado.value.direccion,
        celular: empleado.value.celular,
        fechaContratacion: empleado.value.fechaContratacion,
      }
      if (props.modoEdicion) {
        await http.patch(`${ENDPOINT}/${empleado.value.id}`, body)
      } else {
        await http.post(ENDPOINT, body)
      }
      emit('guardar')
      empleado.value = {} as Empleado
      dialogVisible.value = false
    } catch (error: any) {
      alert(error?.response?.data?.message)
    }
  }

  onMounted(() => {
    obtenerUsuarios()
  })
</script>

<template>
  <div class="card flex justify-center">
    <Dialog 
    v-model:visible="dialogVisible" 
    :header="props.modoEdicion ? 'Editar Empleado' : 'Crear Empleado'" 
    :style="{ backgroundColor: '#35b847', color: 'black' }"
    style="width: 25rem"
    >
      
    <div class="flex items-center gap-4 mb-4">
        <label for="usuario" class="font-semibold w-4">Usuario</label>
        <Select id="usuario" v-model="empleado.idUsuarios" :options="usuariosConOpcionVacia" option-label="usuario"
          option-value="id" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="ci" class="font-semibold w-4">CI</label>
        <InputText id="ci" v-model="empleado.ci" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombres" class="font-semibold w-4">Nombres</label>
        <InputText id="nombres" v-model="empleado.nombres" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellidoPaterno" class="font-semibold w-4">ApellidoPaterno</label>
        <InputText id="apellidoPaterno" v-model="empleado.apellidoPaterno" class="flex-auto custom-input" autocomplete="off"
          autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="apellidoMaterno" class="font-semibold w-4">ApellidoMaterno</label>
        <InputText id="apellidoMaterno" v-model="empleado.apellidoMaterno" class="flex-auto custom-input" autocomplete="off"
          autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="cargo" class="font-semibold w-4">Cargo</label>
        <InputText id="cargo" v-model="empleado.cargo" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="email" class="font-semibold w-4">Email</label>
        <InputText id="email" v-model="empleado.email" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="direccion" class="font-semibold w-4">Direccion</label>
        <InputText id="direccion" v-model="empleado.direccion" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="celular" class="font-semibold w-4">Celular</label>
        <InputText id="celular" v-model="empleado.celular" class="flex-auto custom-input" autocomplete="off" autofocus />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="fecha de contratacion" class="font-semibold w-4">Fecha de Contratacion</label>
        <InputText id="fecha de contratacion" v-model="empleado.fechaContratacion" class="flex-auto custom-input" type="date"
          autocomplete="off" autofocus />
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
