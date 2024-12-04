<script setup lang="ts">
import { ref } from 'vue';

// Estado para saber si el video está silenciado o no
const isMuted = ref(true);  // Por defecto, el video está silenciado

// Método para alternar el estado de silenciado
function toggleMute() {
  isMuted.value = !isMuted.value;
}
</script>

<template>
  <div>

    <section class="hero-section" id="section_1">
      <div class="section-overlay"></div>

      <div class="container d-flex justify-content-center align-items-center">
        <div class="row">

          <div class="col-12 mt-auto mb-5 text-center">
            <small>LICORERIA</small>

            <h1 class="text-white mb-5">EL ÚLTIMO TRAGO</h1>

            <a class="btn custom-btn smoothscroll" href="#section_2">Comencemos</a>
          </div>

          <div class="col-lg-12 col-12 mt-auto d-flex flex-column flex-lg-row text-center">
            <div class="date-wrap">

            </div>

            <div class="location-wrap mx-auto py-3 py-lg-0">
              <h5 class="text-white">
                <i class="custom-icon bi-geo-alt me-2"></i>
                Sucre Zona Villa Armonia Avenida Circunvalación
              </h5>
            </div>

            <div class="social-share">
              <ul class="social-icon d-flex align-items-center justify-content-center">
                <span class="text-white me-3">Compartir:</span>

                <li class="social-icon-item">
                  <a href="#" class="social-icon-link">
                    <span class="bi-facebook"></span>
                  </a>
                </li>

                <li class="social-icon-item">
                  <a href="#" class="social-icon-link">
                    <span class="bi-twitter"></span>
                  </a>
                </li>

                <li class="social-icon-item">
                  <a href="#" class="social-icon-link">
                    <span class="bi-instagram"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="video-wrap">
        <video autoplay loop class="custom-video" poster="" :muted="isMuted">
          <source src="@/assets/video/Video Publicitario de Licores - jaime sanchez coelho (720p, h264, youtube).mp4"
            type="video/mp4">

          Your browser does not support the video tag.
        </video>
        <!-- Botón para alternar el estado de silencio -->
        <button @click="toggleMute" class="mute-btn">
          {{ isMuted ? 'Activar sonido' : 'Silenciar' }}
        </button>
      </div>
    </section>


    <section class="about-section section-padding" id="section_2">
      <div class="container">
        <div class="row">

          <div class="col-lg-6 col-12 mb-4 mb-lg-0 d-flex align-items-center">
            <div class="services-info">
              <h2 class="text-white mb-4">Conócenos</h2>

              <p class="text-white">En Licorería El Último Trago, nos enorgullece ofrecer una amplia selección de
                bebidas alcohólicas de la más alta calidad, perfectas para cualquier ocasión. Ya sea que estés buscando
                una botella de vino premium, un licor exótico, o la mejor cerveza artesanal, tenemos algo para todos los
                gustos.

                Nuestro compromiso es ofrecerte no solo productos excepcionales, sino también un servicio al cliente
                personalizado que te haga sentir como en casa.

                Ubicados en el corazón de la ciudad, nuestro equipo está siempre dispuesto a asesorarte en la elección
                de tus bebidas favoritas, asegurando que cada compra sea una experiencia satisfactoria. </p>
              <h6 class="text-white mt-4">Licoreria EL ÚLTIMO TRAGO</h6>

              <p class="text-white">Es más que una simple licorería: somos un punto de encuentro para quienes disfrutan
                del buen beber, con un ambiente amigable, confiable y lleno de buena energía. Te invitamos a visitarnos
                y descubrir todo lo que tenemos para ofrecerte. ¡Nos encantará ser parte de tus celebraciones y momentos
                especiales!</p>
            </div>
          </div>

          <div class="col-lg-6 col-12">
            <div class="about-text-wrap">
              <img src="@/assets/images/Imagen de WhatsApp 2024-11-30 a las 18.39.15_82a3ad41.jpg"
                class="about-image img-fluid">
            </div>
          </div>

        </div>
      </div>
    </section>


    <section class="artists-section section-padding" id="section_3">
      <div class="container">
        <div class="row justify-content-center">

          <div class="col-12 text-center">
            <h2
              style="background-color: #00ff00; color: black; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;"
              class="mb-4">
              Trabajamos con los Mejores
            </h2>
          </div>

          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img src="@/assets/images/cocaaa.jpg" class="artists-image img-fluid">
              </div>
            </div>
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img src="@/assets/images/paceñaa.jpg" class="artists-image img-fluid">
              </div>
            </div>
          </div>

          <div class="col-lg-5 col-12">
            <div class="artists-thumb">
              <div class="artists-image-wrap">
                <img src="@/assets/images/coronaa.jpg" class="artists-image img-fluid">
              </div>
            </div>

            <div class="artists-thumb">
              <img src="@/assets/images/huari.jpg" class="artists-image img-fluid">
            </div>
            <div class="artists-thumb">
              <img src="@/assets/images/kohlberg.jpg" class="artists-image img-fluid">
            </div>
          </div>

        </div>
      </div>
    </section>
    <section class="contact-section section-padding" id="section_6">
      <div class="container">
        <div class="row">

          <div class="col-lg-8 col-12 mx-auto">
            <h2
              style="background-color: #00ff00; color: black; padding: 15px 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); text-align: center;"
              class="mb-4">
              Te Interesa Trabajar Con Nosotros? Hablemos
            </h2>

            <nav class="d-flex justify-content-center">
              <div class="nav nav-tabs align-items-baseline justify-content-center" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-ContactForm-tab" data-bs-toggle="tab"
                  data-bs-target="#nav-ContactForm" type="button" role="tab" aria-controls="nav-ContactForm"
                  aria-selected="false">
                  <h5>Formulario de Contacto</h5>
                </button>

                <button class="nav-link" id="nav-ContactMap-tab" data-bs-toggle="tab" data-bs-target="#nav-ContactMap"
                  type="button" role="tab" aria-controls="nav-ContactMap" aria-selected="false">
                  <h5>Google Maps</h5>
                </button>
              </div>
            </nav>

            <div class="tab-content shadow-lg mt-5" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-ContactForm" role="tabpanel"
                aria-labelledby="nav-ContactForm-tab">
                <form class="custom-form contact-form mb-5 mb-lg-0" action="#" method="post" role="form">
                  <div class="contact-form-body">
                    <div class="row">
                      <div class="col-lg-6 col-md-6 col-12">
                        <input type="text" name="contact-name" id="contact-name" class="form-control"
                          placeholder="Nombre Completo" required>
                      </div>

                      <div class="col-lg-6 col-md-6 col-12">
                        <input type="email" name="contact-email" id="contact-email" pattern="[^ @]*@[^ @]*"
                          class="form-control" placeholder="Email" required>
                      </div>
                    </div>

                    <input type="text" name="contact-company" id="contact-company" class="form-control"
                      placeholder="Compañía" required>

                    <textarea name="contact-message" rows="3" class="form-control" id="contact-message"
                      placeholder="Mensaje"></textarea>

                    <div class="col-lg-4 col-md-10 col-8 mx-auto">
                      <button type="submit" class="form-control">Contáctanos</button>
                    </div>
                  </div>
                </form>
              </div>

              <div class="tab-pane fade" id="nav-ContactMap" role="tabpanel" aria-labelledby="nav-ContactMap-tab">
                <iframe class="google-map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29974.469402870927!2d120.94861466021855!3d14.106066818082482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd777b1ab54c8f%3A0x6ecc514451ce2be8!2sTagaytay%2C%20Cavite%2C%20Philippines!5e1!3m2!1sen!2smy!4v1670344209509!5m2!1sen!2smy"
                  width="100%" height="450" style="border:0;" allowfullscreen loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"></iframe>
                <!-- You can easily copy the embed code from Google Maps -> Share -> Embed a map // -->
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>

/* Estilo del botón */
.mute-btn {
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  z-index: 10; /* Asegura que el botón esté encima del video */
  transition: background-color 0.3s;
}

.mute-btn:hover {
  background-color: #0056b3;
}
</style>
