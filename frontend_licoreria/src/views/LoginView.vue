<script setup lang="ts">
  import { ref } from 'vue'
  import { useAuthStore } from '@/stores/index'

  const usuario = ref('')
  const clave = ref('')
  const error = ref(false)

  function onSubmit() {
    const authStore = useAuthStore()
    authStore.login(usuario.value, clave.value).catch(() => (error.value = true))
  }
</script>

<template>
  <div class="login-container">
    <div class="header">
      <h1 class="title">Iniciar Sesión</h1>
    </div>
    <form class="form" @submit.prevent="onSubmit">
      <label class="form-label">Usuario:</label>
      <input v-model="usuario" type="text" class="form-input" placeholder="Usuario" autofocus />

      <label class="form-label">Contraseña:</label>
      <input v-model="clave" type="password" class="form-input" placeholder="Contraseña" />

      <p v-if="error" class="error-message">Usuario y/o contraseña incorrectos</p>
      
      <input type="submit" class="form-submit" value="Ingresar" />
    </form>
  </div>
</template>

<style scoped>
/* Fondo de la página */
.login-container {
  background-image: url('/src/assets/images/fondo1.jpg'); /* Cambia esta ruta por la correcta */
  background-size: cover; /* Para cubrir toda la pantalla */
  background-position: center; /* Centra la imagen */
  background-repeat: no-repeat; /* Evita que la imagen se repita */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column; /* Apilar el título y el formulario */
}
/* Contenedor del título */
.header {
  width: 100%; /* Asegura que el título ocupe todo el ancho */
  display: flex;
  justify-content: center; /* Centra el título */
  margin-bottom: 20px; /* Espacio entre título y formulario */
  margin-left: 64%; 
}

/* Título */
.title {
  color: #1eb32a;
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
  animation: fadeIn 1s ease-in-out;
  
}

/* Estilo del formulario */
.form {
  display: flex;
  flex-direction: column;
  align-items:safe; /* Alinea los elementos del formulario al centro */
  background: rgba(108, 250, 108, 0.116);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
  width: 100%;
  max-width: 290px;
  animation: formAnimation 0.8s ease-out;
  margin-left: 65%; /* Mueve el formulario 20% hacia la derecha */
}

/* Etiquetas de los inputs */
.form-label {
  color: #ffffff;
  margin-bottom: 0.5rem;
  font-weight: bold;
  
}

/* Estilo de los inputs */
.form-input {
  width: 100%;
  padding: 12px 15px;
  margin-bottom: 1rem;
  background: transparent;
  border: 2px solid #1eb32a;
  border-radius: 5px;
  color: #ffffff;
  font-size: 1rem;
  transition: all 0.3s ease;
}

/* Estilo de los inputs en enfoque */
.form-input:focus {
  border-color: #00ff00;
  outline: none;
  transform: scale(1.05);
}

/* Mensaje de error */
.error-message {
  color: #ff0000;
  font-size: 0.9rem;
  margin-bottom: 1rem;
  animation: fadeInError 0.5s ease-in-out;
}

/* Estilo del botón de submit */
.form-submit {
  padding: 12px 20px;
  background-color: #00ff00;
  border: none;
  border-radius: 30px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  align-items: center;
}

.form-submit:hover {
  background-color: #1eb32a;
  transform: translateY(-3px);
}

/* Animaciones */
@keyframes formAnimation {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeInError {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>