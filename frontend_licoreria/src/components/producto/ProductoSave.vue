<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, onMounted, ref, watch } from 'vue'

const ENDPOINT = 'productos'
const props = defineProps({
  mostrar: Boolean,
  producto: {
    type: Object as () => Producto,
    default: () => ({}) as Producto,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const categorias = ref<Categoria[]>([]) // para que aparezcas categorias en el groubox

const dialogVisible = computed({
  get: () => props.mostrar,
  set: value => {
    if (!value) emit('close')
  },
})

const precioCompraString = computed({
  get: () => producto.value.precioCompra?.toString() || '',
  set: (value) => {
    producto.value.precioCompra = parseFloat(value) || 0;
  },
});

const precioVentaString = computed({
  get: () => producto.value.precioVenta?.toString() || '',
  set: (value) => {
    producto.value.precioVenta = parseFloat(value) || 0;
  },
});

const stockString = computed({
  get: () => producto.value.stock?.toString() || '',
  set: (value) => {
    producto.value.stock = parseInt(value) || 0;
  },
});










const producto = ref<Producto>({ ...props.producto })
watch(
  () => props.producto,
  (newVal) => {
    producto.value = { ...newVal }
  },
)

async function obtenerCategorias() {
  categorias.value = await http.get('categoria').then((response) => response.data)
}

async function handleSave() {
  try {
    const body = {
      idCategoria: producto.value.categoria.id,
      codigo: producto.value.codigo,
      nombre: producto.value.nombre,
      descripcion: producto.value.descripcion,
      tipoUnidad: producto.value.tipoUnidad,
      precioCompra: producto.value.precioCompra,
      precioVenta: producto.value.precioVenta,
      stock: producto.value.stock,
   }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${producto.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    producto.value = {} as Producto
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

onMounted(() => {
  obtenerCategorias()
})
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
    <div class="flex items-center gap-4 mb-4">
        <label for="categoria" class="font-semibold w-4">Categoria</label>
        <Select
          id="categoria"
          v-model="producto.categoria"
          :options="categorias"
          option-label="nombre"
          class="flex-auto"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="codigo" class="font-semibold w-4">Codigo</label>
        <InputText
          id="codigo"
          v-model="producto.codigo"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="producto.nombre"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripcion</label>
        <InputText
          id="descripcion"
          v-model="producto.descripcion"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tipoUnidad" class="font-semibold w-4">Tipo de Unidad</label>
        <InputText
          id="tipoUnidad"
          v-model="producto.tipoUnidad"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precioCompra" class="font-semibold w-4">PrecioCompra</label>
        <InputText
          id="precioCompra"
          v-model ="precioCompraString"
          type="number"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precioVenta" class="font-semibold w-4">precioVenta</label>
        <InputText
          id="precioVenta" 
          v-model="precioVentaString"
          type="number"
          class="flex-auto"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-4">Stock</label>
        <InputText
          id="stock"
          v-model="stockString"
          type="number"
          class="flex-auto"
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
