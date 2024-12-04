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

              <!-- Menú desplegable para Personal -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownProducto" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Personal
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownProducto">
                  <li>
                    <RouterLink to="/usuarios" class="dropdown-item">Usuarios</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/empleados" class="dropdown-item">Empleados</RouterLink>
                  </li>
                </ul>
              </li>

              <!-- Menú desplegable para Inventario -->
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownVentas" role="button"
                  data-bs-toggle="dropdown" aria-expanded="false">
                  Inventario
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdownVentas">
                  <li>
                    <RouterLink to="/categoria" class="dropdown-item">Categorías</RouterLink>
                  </li>
                  <li>
                    <RouterLink to="/productos" class="dropdown-item">Productos</RouterLink>
                  </li>
                </ul>
              </li>

              <li class="nav-item">
                <RouterLink to="/proveedores" class="nav-link click-scroll">Proveedores</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/clientes" class="nav-link click-scroll">Clientes</RouterLink>
              </li>

              <!--
            <li class="nav-item">
              <RouterLink to="/productosVenta" class="nav-link click-scroll">Productos Disponibles</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/carrito" class="nav-link click-scroll">Carrito de Ventas</RouterLink>
            </li>
            -->

              <li class="nav-item">
                <RouterLink to="/historial" class="nav-link click-scroll">Historial de Compras</RouterLink>
              </li>

              <li class="nav-item">
                <RouterLink to="/prueva" class="nav-link click-scroll">Compras</RouterLink>
              </li>
            </slot>
          </ul>



          <a  @click="authStore.logout()" class="btn custom-btn d-lg-block d-none">Salir</a>
        </div>
      </div>
    </nav>

  </div>
</template>

<style scoped>

  /* Personalización de los menús desplegables */
  .navbar-nav .nav-item.dropdown:hover .dropdown-menu {
    display: block;
  }

</style>