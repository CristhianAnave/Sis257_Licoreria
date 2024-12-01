import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores';
import { getTokenFromLocalStorage } from '@/helpers';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/categoria',
      name: 'categoria',
      component: () => import('../views/CategoriaView.vue'),
    },
    {
      path: '/clientes',
      name: 'clientes',
      component: () => import('../views/ClienteView.vue'),
    },
    {
      path: '/proveedores',
      name: 'proveedores',
      component: () => import('../views/ProveedorView.vue'),
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductoView.vue'),
    },
    {
      path: '/empleados',
      name: 'empleados',
      component: () => import('../views/EmpleadoView.vue'),
    },
    {
      path: '/usuarios',
      name: 'usuarios',
      component: () => import('../views/UsuarioView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/productosVenta/',
      name: 'productosVenta',
      component: () => import('../views/ProductoVentaView.vue'),
    },
    {
      path: '/carrito/',
      name: 'carrito',
      component: () => import('../views/CarritoView.vue'),
    },
    {
      path: '/historial/',
      name: 'historial',
      component: () => import('../views/HistorialView.vue'),
    },
    {
      path: '/prueva/',
      name: 'prueva',
      component: () => import('../views/PruevaView.vue'),
    },
  ],
})

router.beforeEach(async to => {
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !getTokenFromLocalStorage()) {
    if (authStore) authStore.logout();
    authStore.returnUrl = to.fullPath;
    return "/login";
  }
});

export default router
