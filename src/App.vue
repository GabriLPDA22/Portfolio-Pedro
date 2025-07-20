<!-- src/App.vue -->
<template>
  <div id="app" class="portfolio">
    <!-- Header/Navigation Component -->
    <Header
      :portfolio-data="portfolioData"
      :is-mobile-menu-open="isMobileMenuOpen"
      @toggle-mobile-menu="toggleMobileMenu"
      @close-mobile-menu="closeMobileMenu"
    />

    <!-- Hero Section Component -->
    <HeroSection :portfolio-data="portfolioData" />

    <!-- About Section Component -->
    <AboutSection :about-data="portfolioData.about" />

    <!-- Skills Section Component -->
    <SkillsSection :skills-data="portfolioData.skills" />

    <!-- Projects Section Component -->
    <ProjectsSection :projects-data="portfolioData.projects" />

    <!-- Experience Section Component -->
    <ExperienceSection :experience-data="portfolioData.experience" />

    <!-- Contact Section Component -->
    <ContactSection
      :contact-data="portfolioData.contact"
      :personal-data="portfolioData.personal"
    />

    <!-- Footer Component -->
    <Footer :portfolio-data="portfolioData" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { portfolioData } from '@/data/portfolio.js'

// Importar componentes
import Header from '@/components/layout/Header.vue'
import Footer from '@/components/layout/Footer.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import SkillsSection from '@/components/sections/SkillsSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import ExperienceSection from '@/components/sections/ExperienceSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'

export default {
  name: 'Portfolio',
  components: {
    Header,
    Footer,
    HeroSection,
    AboutSection,
    SkillsSection,
    ProjectsSection,
    ExperienceSection,
    ContactSection
  },
  setup() {
    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
    }

    onMounted(() => {
      // Smooth scroll para los enlaces de navegación
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault()
          const target = document.querySelector(this.getAttribute('href'))
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            })
          }
        })
      })

      // Cerrar menú móvil al hacer clic fuera
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.header__nav') && isMobileMenuOpen.value) {
          closeMobileMenu()
        }
      })

      // Animaciones al hacer scroll
      const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      }, observerOptions)

      // Observar secciones para animaciones
      document.querySelectorAll('section').forEach(section => {
        observer.observe(section)
      })
    })

    return {
      portfolioData,
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu
    }
  }
}
</script>

<style lang="scss">
// Importar estilos base
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

// Reset y base
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: $text-primary;
  background: $bg-light;
  overflow-x: hidden;
}

// Clase base del portfolio
.portfolio {
  min-height: 100vh;

  // Animaciones de entrada
  section {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease;

    &.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

// Smooth scroll
html {
  scroll-behavior: smooth;
}

// Keyframes para animaciones
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
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

// Utilidades globales
.container {
  @include container;
}

.section-padding {
  @include section-padding;
}

.section-title {
  @include section-title;
}

.btn-primary {
  @include btn-primary;
}

.btn-secondary {
  @include btn-base;
  background: transparent;
  color: $text-white;
  border-color: $text-white;

  &:hover {
    background: $text-white;
    color: $primary-color;
  }
}

.card {
  @include card;
}

// Clases de utilidad para responsive
.grid-responsive-2 {
  @include grid-responsive(1, 2, 2);
}

.grid-responsive-3 {
  @include grid-responsive(1, 2, 3);
}

.flex-center {
  @include flex-center;
}

.flex-between {
  @include flex-between;
}

// Accesibilidad
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

// Focus styles mejorados
*:focus {
  outline: 2px solid $primary-color;
  outline-offset: 2px;
}

// Scrollbar personalizada (webkit)
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: $bg-light;
}

::-webkit-scrollbar-thumb {
  background: $primary-color;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: $primary-dark;
}

// Estados de reducción de movimiento
@include reduced-motion {
  .portfolio {
    section {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }

  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

// Print styles
@media print {
  .portfolio {
    * {
      background: white !important;
      color: black !important;
    }

    .header,
    .hero__visual,
    .contact__form {
      display: none !important;
    }
  }
}
</style>
