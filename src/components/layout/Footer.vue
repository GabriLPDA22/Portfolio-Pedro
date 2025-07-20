<!-- src/components/layout/Footer.vue -->
<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <!-- Información principal -->
        <div class="footer__main">
          <h3 class="footer__name">{{ portfolioData.personal.name }}</h3>
          <p class="footer__title">{{ portfolioData.personal.title }}</p>
          <p class="footer__description">{{ portfolioData.personal.subtitle }}</p>
        </div>

        <!-- Enlaces rápidos -->
        <div class="footer__links">
          <h4 class="footer__section-title">Navegación</h4>
          <ul class="footer__nav">
            <li><a href="#about">Sobre Mí</a></li>
            <li><a href="#skills">Habilidades</a></li>
            <li><a href="#projects">Proyectos</a></li>
            <li><a href="#experience">Experiencia</a></li>
            <li><a href="#contact">Contacto</a></li>
          </ul>
        </div>

        <!-- Información de contacto -->
        <div class="footer__contact">
          <h4 class="footer__section-title">Contacto</h4>
          <div class="footer__contact-info">
            <a :href="`mailto:${portfolioData.contact.email}`" class="footer__contact-link">
              📧 {{ portfolioData.contact.email }}
            </a>
            <a :href="`tel:${portfolioData.contact.phone}`" class="footer__contact-link">
              📱 {{ portfolioData.contact.phone }}
            </a>
            <span class="footer__contact-item">
              📍 {{ portfolioData.personal.location }}
            </span>
          </div>
        </div>

        <!-- Redes sociales -->
        <div class="footer__social">
          <h4 class="footer__section-title">Sígueme</h4>
          <div class="footer__social-links">
            <a
              v-if="portfolioData.contact.linkedin"
              :href="portfolioData.contact.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              title="LinkedIn"
            >
              💼
            </a>
            <a
              v-if="portfolioData.contact.github"
              :href="portfolioData.contact.github"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              title="GitHub"
            >
              🔗
            </a>
            <a
              v-if="portfolioData.contact.website"
              :href="portfolioData.contact.website"
              target="_blank"
              rel="noopener noreferrer"
              class="footer__social-link"
              title="Website"
            >
              🌐
            </a>
          </div>
        </div>
      </div>

      <!-- Separador -->
      <div class="footer__divider"></div>

      <!-- Copyright y información adicional -->
      <div class="footer__bottom">
        <div class="footer__copyright">
          <p>&copy; {{ currentYear }} {{ portfolioData.personal.name }}. Todos los derechos reservados.</p>
        </div>

        <div class="footer__credits">
          <p>
            Desarrollado con ❤️ usando
            <span class="footer__tech">Vue.js</span>,
            <span class="footer__tech">Tailwind CSS</span> y
            <span class="footer__tech">SASS</span>
          </p>
        </div>

        <!-- Botón volver arriba -->
        <button @click="scrollToTop" class="footer__scroll-top" title="Volver arriba">
          ⬆️
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Footer',
  props: {
    portfolioData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear())

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    return {
      currentYear,
      scrollToTop
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: $bg-dark;
  color: $text-light;
  padding: 3rem 0 1rem;

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
    margin-bottom: 2rem;

    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
      grid-template-columns: 2fr 1fr 1fr 1fr;
    }
  }

  &__main {
    @include lg {
      grid-column: span 1;
    }
  }

  &__name {
    font-size: $font-xl;
    font-weight: $font-bold;
    color: $text-white;
    margin-bottom: 0.5rem;
  }

  &__title {
    font-size: $font-base;
    color: $accent-color;
    margin-bottom: 0.5rem;
    font-weight: $font-medium;
  }

  &__description {
    font-size: $font-sm;
    line-height: 1.6;
    color: $text-light;
  }

  &__section-title {
    font-size: $font-base;
    font-weight: $font-semibold;
    color: $text-white;
    margin-bottom: 1rem;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 30px;
      height: 2px;
      background: $accent-color;
    }
  }

  &__nav {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      margin-bottom: 0.5rem;
    }

    a {
      color: $text-light;
      text-decoration: none;
      font-size: $font-sm;
      transition: color $transition-base;
      display: block;
      padding: 0.25rem 0;

      &:hover {
        color: $accent-color;
        padding-left: 0.5rem;
      }
    }
  }

  &__contact-info {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__contact-link,
  &__contact-item {
    color: $text-light;
    text-decoration: none;
    font-size: $font-sm;
    transition: color $transition-base;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    &:hover {
      color: $accent-color;
    }
  }

  &__contact-item {
    cursor: default;
  }

  &__social-links {
    display: flex;
    gap: 1rem;
  }

  &__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background: rgba($text-light, 0.1);
    border-radius: 50%;
    text-decoration: none;
    font-size: 1.25rem;
    transition: all $transition-base;

    &:hover {
      background: $accent-color;
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba($accent-color, 0.3);
    }
  }

  &__divider {
    height: 1px;
    background: rgba($text-light, 0.2);
    margin: 2rem 0 1rem;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    text-align: center;
    position: relative;

    @include md {
      flex-direction: row;
      justify-content: space-between;
      text-align: left;
    }
  }

  &__copyright,
  &__credits {
    p {
      font-size: $font-xs;
      color: rgba($text-light, 0.8);
      margin: 0;
    }
  }

  &__tech {
    color: $accent-color;
    font-weight: $font-medium;
  }

  &__scroll-top {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    background: $primary-color;
    border: none;
    border-radius: 50%;
    font-size: 1.25rem;
    cursor: pointer;
    transition: all $transition-base;
    z-index: $z-fixed;
    box-shadow: $shadow-lg;

    @include md {
      position: static;
      bottom: auto;
      right: auto;
    }

    &:hover {
      background: $accent-color;
      transform: translateY(-2px);
    }
  }
}

// Responsive adjustments
@media (max-width: 640px) {
  .footer {
    padding: 2rem 0 1rem;

    &__content {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }

    &__main {
      text-align: center;
    }

    &__social-links {
      justify-content: center;
    }

    &__bottom {
      gap: 0.5rem;
    }

    &__scroll-top {
      bottom: 1rem;
      right: 1rem;
      width: 2.5rem;
      height: 2.5rem;
      font-size: 1rem;
    }
  }
}

// Animaciones
.footer {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Estados especiales
.footer__social-link:nth-child(1) { animation-delay: 0.1s; }
.footer__social-link:nth-child(2) { animation-delay: 0.2s; }
.footer__social-link:nth-child(3) { animation-delay: 0.3s; }

// Efecto de partículas en el fondo (opcional)
.footer {
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba($accent-color, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba($primary-color, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba($accent-color, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  > .container {
    position: relative;
    z-index: 1;
  }
}
</style>
