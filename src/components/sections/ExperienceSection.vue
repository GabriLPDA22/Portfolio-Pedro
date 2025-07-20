<!-- src/components/sections/ExperienceSection.vue -->
<template>
  <section id="experience" class="experience section-padding">
    <div class="container">
      <h3 class="section-title">Experiencia Profesional</h3>
      <div class="experience__timeline">
        <div
          v-for="(exp, index) in experienceData"
          :key="exp.id"
          class="experience__item"
          :style="{ animationDelay: `${index * 0.3}s` }"
        >
          <div class="experience__marker"></div>
          <div class="experience__content">
            <div class="experience__header">
              <h4 class="experience__position">{{ exp.position }}</h4>
              <span class="experience__period">{{ exp.period }}</span>
            </div>
            <h5 class="experience__company">{{ exp.company }}</h5>
            <p class="experience__description">{{ exp.description }}</p>

            <!-- Mostrar responsabilidades si existen -->
            <div v-if="exp.responsibilities" class="experience__responsibilities">
              <h6>Responsabilidades principales:</h6>
              <ul>
                <li v-for="responsibility in exp.responsibilities" :key="responsibility">
                  {{ responsibility }}
                </li>
              </ul>
            </div>

            <!-- Mostrar logros si existen -->
            <div v-if="exp.achievements" class="experience__achievements">
              <h6>Logros destacados:</h6>
              <ul>
                <li v-for="achievement in exp.achievements" :key="achievement">
                  {{ achievement }}
                </li>
              </ul>
            </div>

            <!-- Mostrar tecnologías si existen -->
            <div v-if="exp.technologies" class="experience__technologies">
              <span
                v-for="tech in exp.technologies"
                :key="tech"
                class="experience__tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ExperienceSection',
  props: {
    experienceData: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.experience {
  background: $bg-light;

  &__timeline {
    position: relative;
    max-width: 800px;
    margin: 0 auto;

    // Línea central del timeline
    &::before {
      content: '';
      position: absolute;
      left: 2rem;
      top: 0;
      bottom: 0;
      width: 2px;
      background: $primary-color;

      @include md {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }

  &__item {
    position: relative;
    margin-bottom: 3rem;
    padding-left: 5rem;
    animation: fadeInUp 0.8s ease-out both;

    @include md {
      width: 50%;
      padding-left: 0;
      padding-right: 2rem;

      &:nth-child(even) {
        left: 50%;
        padding-right: 0;
        padding-left: 2rem;

        .experience__content {
          text-align: left;
        }
      }

      &:nth-child(odd) {
        .experience__content {
          text-align: right;
        }
      }
    }

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__marker {
    position: absolute;
    left: 1.5rem;
    top: 0;
    width: 1rem;
    height: 1rem;
    background: $accent-color;
    border-radius: 50%;
    border: 3px solid $bg-white;
    box-shadow: 0 0 0 3px $primary-color;

    @include md {
      left: -0.5rem;
    }

    // Animación de pulso
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: $accent-color;
      animation: pulse 2s ease-in-out infinite;
    }
  }

  &__content {
    background: $bg-white;
    padding: 1.5rem;
    border-radius: $radius-lg;
    box-shadow: $shadow-md;
    transition: all $transition-base;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $shadow-xl;
      border-color: $primary-color;
    }

    @include md {
      padding: 2rem;
    }
  }

  &__header {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 0.75rem;

    @include sm {
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-start;
    }
  }

  &__position {
    font-size: $font-xl;
    font-weight: $font-semibold;
    color: $primary-color;
    margin: 0;
  }

  &__period {
    font-size: $font-sm;
    color: $accent-color;
    font-weight: $font-medium;
    background: rgba($accent-color, 0.1);
    padding: 0.25rem 0.75rem;
    border-radius: $radius-xl;
    white-space: nowrap;
  }

  &__company {
    font-size: $font-lg;
    font-weight: $font-medium;
    color: $text-primary;
    margin-bottom: 1rem;
  }

  &__description {
    color: $text-secondary;
    line-height: 1.7;
    margin-bottom: 1rem;
  }

  &__responsibilities,
  &__achievements {
    margin-bottom: 1rem;

    h6 {
      font-size: $font-sm;
      font-weight: $font-semibold;
      color: $primary-color;
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    ul {
      list-style: none;
      padding-left: 0;

      li {
        position: relative;
        padding-left: 1.5rem;
        margin-bottom: 0.25rem;
        color: $text-secondary;
        font-size: $font-sm;
        line-height: 1.5;

        &::before {
          content: '▶';
          position: absolute;
          left: 0;
          color: $accent-color;
          font-size: 0.75rem;
        }
      }
    }
  }

  &__achievements {
    ul li::before {
      content: '★';
      color: $accent-color;
    }
  }

  &__technologies {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  &__tech-tag {
    background: $primary-color;
    color: $text-white;
    padding: 0.25rem 0.75rem;
    border-radius: $radius-xl;
    font-size: $font-xs;
    font-weight: $font-medium;
    transition: all $transition-base;

    &:hover {
      background: $primary-dark;
      transform: scale(1.05);
    }
  }
}

// Animaciones
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

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  50% {
    opacity: 0.7;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

// Responsive
@media (max-width: 767px) {
  .experience {
    &__timeline {
      &::before {
        left: 1rem;
      }
    }

    &__item {
      padding-left: 3rem;
    }

    &__marker {
      left: 0.5rem;
    }

    &__content {
      padding: 1rem;
    }

    &__header {
      flex-direction: column;
      gap: 0.25rem;
    }

    &__position {
      font-size: $font-lg;
    }

    &__company {
      font-size: $font-base;
    }

    &__period {
      align-self: flex-start;
    }
  }
}

// Estados especiales para el primer elemento (trabajo actual)
.experience__item:first-child {
  .experience__marker {
    background: $accent-color;
    box-shadow: 0 0 0 3px $accent-color, 0 0 0 6px rgba($accent-color, 0.3);

    &::after {
      animation-duration: 1.5s;
    }
  }

  .experience__content {
    border-left: 3px solid $accent-color;
  }

  .experience__position {
    color: $accent-color;
  }
}

// Dark mode
@include dark-mode {
  .experience {
    background: $bg-medium;

    &__content {
      background: $bg-dark;
      color: $text-light;
    }

    &__company {
      color: $text-white;
    }

    &__description {
      color: $text-light;
    }

    &__responsibilities,
    &__achievements {
      ul li {
        color: $text-light;
      }
    }

    &__marker {
      border-color: $bg-dark;
    }
  }
}
</style>
