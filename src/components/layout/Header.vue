<template>
  <header class="header">
    <nav class="header__nav">
      <!-- Brand/Logo -->
      <div class="header__brand">
        <h1 class="header__logo">{{ portfolioData.personal.name }}</h1>
        <span class="header__subtitle">{{ portfolioData.personal.title }}</span>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="header__menu-toggle"
        @click="$emit('toggle-mobile-menu')"
        :class="{ 'header__menu-toggle--active': isMobileMenuOpen }"
        aria-label="Alternar menú de navegación"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Navigation Menu -->
      <ul class="header__nav-list" :class="{ 'header__nav-list--open': isMobileMenuOpen }">
        <li class="header__nav-item">
          <a href="#about" @click="$emit('close-mobile-menu')" class="header__nav-link">
            Sobre Mí
          </a>
        </li>
        <li class="header__nav-item">
          <a href="#skills" @click="$emit('close-mobile-menu')" class="header__nav-link">
            Habilidades
          </a>
        </li>
        <li class="header__nav-item">
          <a href="#projects" @click="$emit('close-mobile-menu')" class="header__nav-link">
            Proyectos
          </a>
        </li>
        <li class="header__nav-item">
          <a href="#experience" @click="$emit('close-mobile-menu')" class="header__nav-link">
            Experiencia
          </a>
        </li>
        <li class="header__nav-item">
          <a href="#contact" @click="$emit('close-mobile-menu')" class="header__nav-link">
            Contacto
          </a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    portfolioData: {
      type: Object,
      required: true
    },
    isMobileMenuOpen: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggle-mobile-menu', 'close-mobile-menu']
}
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  z-index: 1030;
  border-bottom: 1px solid #e2e8f0;
  transition: all 0.3s ease;

  &__nav {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    @media (min-width: 768px) {
      padding: 1rem 2rem;
    }
  }

  &__brand {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__logo {
    font-size: 1.25rem;
    font-weight: 700;
    color: #2563eb;
    line-height: 1;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__subtitle {
    font-size: 0.75rem;
    color: #64748b;
    font-weight: 500;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }

  &__menu-toggle {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 24px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;

    @media (min-width: 768px) {
      display: none;
    }

    span {
      width: 100%;
      height: 3px;
      background: #2563eb;
      border-radius: 0.25rem;
      transition: all 0.3s ease;
      transform-origin: center;
    }

    &--active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(6px, 6px);
      }

      span:nth-child(2) {
        opacity: 0;
        transform: scale(0);
      }

      span:nth-child(3) {
        transform: rotate(-45deg) translate(6px, -6px);
      }
    }
  }

  &__nav-list {
    position: fixed;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 2rem 1rem;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    border-bottom: 1px solid #e2e8f0;
    list-style: none;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      position: static;
      flex-direction: row;
      padding: 0;
      background: none;
      transform: none;
      border: none;
      box-shadow: none;
      display: flex;
      gap: 2rem;
    }

    &--open {
      transform: translateY(0);
    }
  }

  &__nav-item {
    margin: 1rem 0;

    @media (min-width: 768px) {
      margin: 0;
    }
  }

  &__nav-link {
    display: block;
    text-decoration: none;
    color: #1e293b;
    font-weight: 500;
    font-size: 1.125rem;
    padding: 0.5rem 0;
    position: relative;
    transition: color 0.3s ease;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 2px;
      background: #f59e0b;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #2563eb;

      &::after {
        width: 100%;
      }
    }
  }
}
</style>
