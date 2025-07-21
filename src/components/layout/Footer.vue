<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__content">
        <div class="footer__main">
          <h3 class="footer__name">{{ portfolioData.personal.name }}</h3>
          <p class="footer__title">{{ portfolioData.personal.subtitle }}</p>
        </div>

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

        <div class="footer__contact">
          <h4 class="footer__section-title">Contacto</h4>
          <div class="footer__contact-info">
            <a :href="`mailto:${portfolioData.contact.email}`" class="footer__contact-link">
              <Mail class="footer__icon" />
              <span>{{ portfolioData.contact.email }}</span>
            </a>
            <a :href="`tel:${portfolioData.contact.phone}`" class="footer__contact-link">
              <Phone class="footer__icon" />
              <span>{{ portfolioData.contact.phone }}</span>
            </a>
            <span class="footer__contact-item">
              <MapPin class="footer__icon" />
              <span>{{ portfolioData.personal.location }}</span>
            </span>
          </div>
        </div>

        <div class="footer__social">
          <h4 class="footer__section-title">Sígueme</h4>
          <div class="footer__social-links">
            <a v-if="portfolioData.contact.linkedin" :href="portfolioData.contact.linkedin" target="_blank" rel="noopener noreferrer" class="footer__social-link" title="LinkedIn">
              <Linkedin />
            </a>
            <a v-if="portfolioData.contact.github" :href="portfolioData.contact.github" target="_blank" rel="noopener noreferrer" class="footer__social-link" title="GitHub">
              <Github />
            </a>
             <a v-if="portfolioData.contact.website" :href="portfolioData.contact.website" target="_blank" rel="noopener noreferrer" class="footer__social-link" title="Website">
              <Globe />
            </a>
          </div>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__bottom">
        <div class="footer__copyright">
          <p>&copy; {{ currentYear }} {{ portfolioData.personal.name }}. Todos los derechos reservados.</p>
        </div>
        <div class="footer__credits">
          <span>Desarrollado con</span>
          <Heart class="footer__heart-icon" />
          <span>usando Vue.js, Tailwind CSS y SASS</span>
        </div>
      </div>
    </div>

    <transition name="fade">
      <button v-show="showScrollTopButton" @click="scrollToTop" class="footer__scroll-top" title="Volver arriba">
        <ArrowUp />
      </button>
    </transition>
  </footer>
</template>

<script>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Heart, ArrowUp } from 'lucide-vue-next'

export default {
  name: 'Footer',
  components: {
    Mail,
    Phone,
    MapPin,
    Linkedin,
    Github,
    Globe,
    Heart,
    ArrowUp
  },
  props: {
    portfolioData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const currentYear = computed(() => new Date().getFullYear())
    const showScrollTopButton = ref(false)

    const handleScroll = () => {
      showScrollTopButton.value = window.scrollY > 200
    }

    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      window.addEventListener('scroll', handleScroll)
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll)
    })

    return {
      currentYear,
      scrollToTop,
      showScrollTopButton
    }
  }
}
</script>

<style lang="scss" scoped>
// Variables de ejemplo (ajusta a tus valores reales)
$bg-dark: #111827;
$text-light: #9ca3af;
$text-white: #f9fafb;
$accent-color: #f59e0b;
$primary-color: #3b82f6;
$font-sm: 0.875rem;
$font-base: 1rem;
$font-xl: 1.5rem;
$font-medium: 500;
$font-semibold: 600;
$font-bold: 700;
$transition-base: 0.3s ease;
$shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
$z-fixed: 1000;

.footer {
  background-color: $bg-dark;
  color: $text-light;
  padding: 4rem 1rem 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 30%, rgba($primary-color, 0.05), transparent 40%);
    opacity: 0.5;
  }
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.footer__content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
}

.footer__main, .footer__links, .footer__contact, .footer__social {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.footer__name {
  font-size: $font-xl;
  font-weight: $font-bold;
  color: $text-white;
  margin-bottom: 0.25rem;
}

.footer__title {
  font-size: $font-base;
  color: $accent-color;
  font-weight: $font-medium;
}

.footer__section-title {
  font-size: $font-base;
  font-weight: $font-semibold;
  color: $text-white;
  margin-bottom: 1rem;
  position: relative;
  padding-bottom: 0.5rem;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 2px;
    background: $accent-color;
  }
}

.footer__nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    color: $text-light;
    text-decoration: none;
    transition: color $transition-base, transform $transition-base;
    &:hover {
      color: $accent-color;
      transform: translateX(4px);
    }
  }
}

.footer__contact-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer__contact-link, .footer__contact-item {
  color: $text-light;
  text-decoration: none;
  font-size: $font-sm;
  transition: color $transition-base;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  &:hover {
    color: $accent-color;
  }
}

.footer__contact-item {
  cursor: default;
}

.footer__icon {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.footer__social-links {
  display: flex;
  gap: 1rem;
}

.footer__social-link {
  color: $text-light;
  &:hover {
    color: $accent-color;
    transform: translateY(-3px);
  }
}

.footer__divider {
  height: 1px;
  background: rgba($text-light, 0.1);
  margin: 0 auto 2rem;
  width: 100%;
}

.footer__bottom {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  text-align: center;
  font-size: $font-sm;
}

.footer__credits {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: $text-light;
}

.footer__heart-icon {
  width: 1rem;
  height: 1rem;
  color: $accent-color;
  flex-shrink: 0;
}

.footer__scroll-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  width: 3rem;
  height: 3rem;
  background: $primary-color;
  color: $text-white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all $transition-base;
  z-index: $z-fixed;
  box-shadow: $shadow-lg;

  &:hover {
    background: $accent-color;
    transform: scale(1.1);
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (min-width: 768px) {
  .footer__bottom {
    flex-direction: row;
    justify-content: space-between;
  }

  .footer__content {
    grid-template-columns: repeat(2, 1fr);
    text-align: left;
  }

  .footer__main, .footer__links, .footer__contact, .footer__social {
    align-items: flex-start;
  }

  .footer__section-title::after {
    left: 0;
    transform: translateX(0);
  }
}

@media (min-width: 1024px) {
  .footer__content {
    grid-template-columns: 2fr 1fr 1.5fr 1fr;
  }
}
</style>
