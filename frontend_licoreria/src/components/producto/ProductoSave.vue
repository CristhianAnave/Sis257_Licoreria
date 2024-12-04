<script setup lang="ts">
import type { Categoria } from '@/models/categoria'
import type { Producto } from '@/models/producto'
import http from '@/plugins/axios'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import { computed, onMounted, ref, watch } from 'vue'

const validarNumeroPositivo = (campo: string) => {
  const regex = /^[0-9]*\.?[0-9]*$/;  // Expresión regular para solo números y punto decimal

  if (campo === 'precioCompra') {
    if (!regex.test(precioCompraString.value) || parseFloat(precioCompraString.value) < 0) {
      precioCompraString.value = '0';  // Establece 0 si es un valor no válido
    }
  }

  if (campo === 'precioVenta') {
    if (!regex.test(precioVentaString.value) || parseFloat(precioVentaString.value) < 0) {
      precioVentaString.value = '0';  // Establece 0 si es un valor no válido
    }
  }

  if (campo === 'stock') {
    if (!regex.test(stockString.value) || parseInt(stockString.value) < 0) {
      stockString.value = '0';  // Establece 0 si es un valor no válido
    }
  }
};

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
const tipoUnidad = ref([
{ label: 'Caja', value: 'caja' },
  { label: 'Paquete', value: 'paquete' },
  { label: 'Docena', value: 'docena' },
  { label: 'Unidad', value: 'unidad' }
])
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
      :header="props.modoEdicion ? 'Editar Producto' : 'Crear   Producto'"
      :style="{ backgroundColor: '#35b847', color: 'black' }"
      style="width: 25rem"
    >
    <div class="flex items-center gap-4 mb-4" >
        <label for="categoria" class="font-semibold w-4">Categoría</label>
        <Select
          id="categoria"
          v-model="producto.categoria"
          :options="categorias"
          option-label="nombre"
          class="flex-auto "
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="codigo" class="font-semibold w-4">Código</label>
        <InputText
          id="codigo"
          v-model="producto.codigo"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-4">Nombre</label>
        <InputText
          id="nombre"
          v-model="producto.nombre"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="descripcion" class="font-semibold w-4">Descripción</label>
        <InputText
          id="descripcion"
          v-model="producto.descripcion"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tipoUnidad" class="font-semibold w-4">Tipo De Unidad</label>
        <Select
          id="tipoUnidad"
          v-model="producto.tipoUnidad"
          :options="tipoUnidad"
          option-value="value"
          option-label="label"
          class="flex-auto custom-input"
          autocomplete="off"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precioCompra" class="font-semibold w-4">Precio De Compra</label>
        <InputText
          id="precioCompra"
          v-model ="precioCompraString"
          type="number"
          min="0"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
          @input="validarNumeroPositivo('precioCompra')"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="precioVenta" class="font-semibold w-4">Precio De Venta</label>
        <InputText
          id="precioVenta" 
          v-model="precioVentaString"
          type="number"
          min="0"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
          @input="validarNumeroPositivo('precioVenta')"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="stock" class="font-semibold w-4">Stock</label>
        <InputText
          id="stock"
          v-model="stockString"
          type="number"
          min="0"
          class="flex-auto custom-input"
          autocomplete="off"
          autofocus
          @input="validarNumeroPositivo('stock')"
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
