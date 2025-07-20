<!-- src/components/sections/HeroSection.vue -->
<template>
  <section class="hero">
    <div class="hero__content">
      <div class="hero__text">
        <h2 class="hero__title">
          Especialista en <span class="hero__highlight">Mecanizado</span>
        </h2>
        <p class="hero__description">
          {{ portfolioData.personal.description }}
        </p>
        <div class="hero__actions">
          <a href="#projects" class="btn-primary">Ver Proyectos</a>
          <a href="#contact" class="btn-secondary">Contactar</a>
        </div>
      </div>

      <div class="hero__visual">
        <div class="hero__gear hero__gear--large">
          <div class="hero__gear-inner"></div>
        </div>
        <div class="hero__gear hero__gear--medium">
          <div class="hero__gear-inner"></div>
        </div>
        <div class="hero__gear hero__gear--small">
          <div class="hero__gear-inner"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HeroSection',
  props: {
    portfolioData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 1rem 4rem;
  background: $gradient-hero;
  color: $text-white;
  position: relative;
  overflow: hidden;

  @include md {
    padding: 8rem 2rem 4rem;
  }

  &__content {
    @include container;
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
    align-items: center;
    width: 100%;

    @include md {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__text {
    z-index: 2;
  }

  &__title {
    font-size: 2.5rem;
    font-weight: $font-bold;
    margin-bottom: 1rem;
    line-height: 1.2;

    @include md {
      font-size: 3.5rem;
    }
  }

  &__highlight {
    color: $accent-color;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: $accent-color;
      animation: expandWidth 2s ease-in-out 1s both;
    }
  }

  &__description {
    font-size: 1.125rem;
    color: $text-light;
    margin-bottom: 2rem;
    line-height: 1.7;
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;

    @include sm {
      flex-direction: row;
    }
  }

  // Gears Animation
  &__visual {
    position: relative;
    height: 300px;
    display: none;

    @include md {
      display: block;
    }
  }

  &__gear {
    position: absolute;
    border: 4px solid $accent-color;
    border-radius: 50%;

    &::before {
      content: '';
      position: absolute;
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
      border: 4px solid transparent;
      border-top: 4px solid $accent-color;
      border-radius: 50%;
    }

    &--large {
      width: 120px;
      height: 120px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: rotate 8s linear infinite;
    }

    &--medium {
      width: 80px;
      height: 80px;
      top: 20%;
      right: 20%;
      animation: rotate 6s linear infinite reverse;
    }

    &--small {
      width: 60px;
      height: 60px;
      bottom: 20%;
      left: 20%;
      animation: rotate 4s linear infinite;
    }
  }

  &__gear-inner {
    width: 100%;
    height: 100%;
    border: 2px solid $primary-color;
    border-radius: 50%;
    position: relative;

    &::before,
    &::after {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: $accent-color;
      border-radius: 50%;
    }

    &::before {
      top: 10%;
      left: 50%;
      transform: translateX(-50%);
    }

    &::after {
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

// Animaciones
@keyframes expandWidth {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

// Responsive para móvil
@media (max-width: 767px) {
  .hero {
    &__visual {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 200px;
    }

    &__gear {
      &--large {
        width: 80px;
        height: 80px;
      }

      &--medium {
        width: 60px;
        height: 60px;
        top: 10%;
        right: 10%;
      }

      &--small {
        width: 40px;
        height: 40px;
        bottom: 10%;
        left: 10%;
      }
    }
  }
}
</style>
