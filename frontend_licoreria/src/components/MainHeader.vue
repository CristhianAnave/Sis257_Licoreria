<script setup lang="ts">
  import { useAuthStore } from '@/stores';
  import { useRoute } from 'vue-router';

  const authStore = useAuthStore()
  const location = useRoute()
</script>

<template>
  <div>

    <header class="site-header">
      <div class="container">
        <div class="row">

          <div class="col-lg-12 col-12 d-flex flex-wrap">
            <p class="d-flex me-4 mb-0">
              <strong class="text-dark">Bienvenidos a Licoreria EL ÚLTIMO TRAGO</strong>
            </p>
          </div>

        </div>
      </div>
    </header>


    <nav class="navbar navbar-expand-lg" :style="'background-color: ' + (location.path != '/' ? 'black' : '')">
      <div class="container">

      


        <RouterView v-if="!authStore.token" to="/Login" class="btn custom-btn d-lg-none ms-auto me-4">Iniciar Seción
        </RouterView>
        <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-none ms-auto me-4">Salir</a>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav align-items-lg-center ms-auto me-lg-5">
            <li class="nav-item">
              <RouterLink to="/" class="nav-link click-scroll">Inicio</RouterLink>
            </li>
            <slot v-if="authStore.token">
            <li class="nav-item">
              <RouterLink to="/usuarios" class="nav-link click-scroll">Usuarios</RouterLink>
            </li>

              
              <li class="nav-item">
              <RouterLink to="/empleados" class="nav-link click-scroll">Empleados</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/categoria" class="nav-link click-scroll">Categoría</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/productos" class="nav-link click-scroll">Productos</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/proveedores" class="nav-link click-scroll">Proveedores</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/clientes" class="nav-link click-scroll">Clientes</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/productos" class="nav-link click-scroll">Productos</RouterLink>
            </li>

            <li class="nav-item">
              <RouterLink to="/productosVenta" class="nav-link click-scroll">Productos Disponibles</RouterLink>
            </li>


            <li class="nav-item">
              <RouterLink to="/carrito" class="nav-link click-scroll">Carrito de Ventas</RouterLink>
            </li>
            
            <li class="nav-item">
              <RouterLink to="/historial" class="nav-link click-scroll">Historial de Ventas</RouterLink>
            </li>
          </slot>
          </ul>


          <RouterView v-if="!authStore.token" to="/Login" class="btn custom-btn d-lg-block d-none">Iniciar Seción
          </RouterView>
          <a v-else @click="authStore.logout()" class="btn custom-btn d-lg-block d-none">Salir</a>
        </div>
      </div>
    </nav>

  </div>
</template>

<style scoped></style>