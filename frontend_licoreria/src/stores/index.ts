import { defineStore } from 'pinia'
import { getTokenFromLocalStorage } from '@/helpers'
import http from '@/plugins/axios'
import router from '@/router'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),  // Guardamos el usuario como un objeto
    token: getTokenFromLocalStorage(),
    role: localStorage.getItem('role') || '',
    returnUrl: null || '',
  }),
  getters: {
    // Getter para acceder al usuario
    userId: (state) => state.user?.id, // Acceso seguro al ID del usuario
    userName: (state) => state.user?.nombre, // Acceso seguro al nombre del usuario
  },
  actions: {
    async login(usuario: string, clave: string) {
      try {
        const response = await http.post('auth/login', { usuario, clave })
        const usuarioLogueado = response.data.usuario
        this.user = usuarioLogueado // Guardamos el objeto completo de usuario

        // Guardamos el objeto `user` como una cadena JSON
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('token', response.data.access_token || '')
        localStorage.setItem('role', response.data.rol || '')

        this.token = response.data.access_token
        this.role = response.data.rol // Guardamos el rol aquí

        router.push(this.returnUrl || '/')
      } catch (error) {
        console.error('Error de login:', error)
        throw error
      }
    },
    logout() {
      localStorage.clear()
      this.$reset()
      router.push('login')
    },
  },
})

export { useAuthStore }