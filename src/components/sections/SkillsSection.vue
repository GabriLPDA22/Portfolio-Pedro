<!-- src/components/sections/SkillsSection.vue -->
<template>
  <section id="skills" class="skills section-padding">
    <div class="container">
      <h3 class="section-title">Habilidades Técnicas</h3>

      <div v-for="category in skillsData" :key="category.category" class="skills__category">
        <h4 class="skills__category-title">{{ category.category }}</h4>
        <div class="skills__grid">
          <div
            v-for="(skill, index) in category.items"
            :key="skill.name"
            class="skills__card"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="skills__icon">{{ skill.icon }}</div>
            <h5 class="skills__name">{{ skill.name }}</h5>
            <p class="skills__description">{{ skill.description }}</p>

            <div class="skills__level">
              <div class="skills__level-bar">
                <div
                  class="skills__level-fill"
                  :style="{ width: skill.level + '%' }"
                ></div>
              </div>
              <span class="skills__percentage">{{ skill.level }}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'SkillsSection',
  props: {
    skillsData: {
      type: Array,
      required: true
    }
  },
  setup() {
    const skillsSection = ref(null)

    onMounted(() => {
      // Animar las barras de habilidades cuando entren en vista
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skills__level-fill')
            skillBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.transform = 'scaleX(1)'
              }, index * 100)
            })
          }
        })
      }, { threshold: 0.3 })

      const skillsElement = document.querySelector('.skills')
      if (skillsElement) {
        observer.observe(skillsElement)
      }
    })

    return {
      skillsSection
    }
  }
}
</script>

<style lang="scss" scoped>
.skills {
  background: $bg-light;

  &__category {
    margin-bottom: 3rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__category-title {
    font-size: $font-2xl;
    font-weight: $font-bold;
    color: $primary-color;
    margin-bottom: 1.5rem;
    text-align: center;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 2px;
      background: $accent-color;
    }
  }

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;

    @include sm {
      grid-template-columns: repeat(2, 1fr);
    }

    @include md {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    background: $bg-white;
    padding: 2rem;
    border-radius: $radius-lg;
    text-align: center;
    box-shadow: $shadow-sm;
    transition: all $transition-base;
    animation: fadeInUp 0.8s ease-out both;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-10px);
      box-shadow: $shadow-xl;
      border-color: $primary-color;

      .skills__icon {
        transform: scale(1.1);
        filter: none;
      }
    }
  }

  &__icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    transition: all $transition-base;
    filter: grayscale(0.5);
    display: inline-block;
  }

  &__name {
    font-size: $font-lg;
    font-weight: $font-semibold;
    margin-bottom: 0.5rem;
    color: $text-primary;
  }

  &__description {
    font-size: $font-sm;
    color: $text-secondary;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }

  &__level {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__level-bar {
    flex: 1;
    height: 8px;
    background: #e2e8f0;
    border-radius: $radius-sm;
    overflow: hidden;
    position: relative;
  }

  &__level-fill {
    height: 100%;
    background: $gradient-primary;
    border-radius: $radius-sm;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1s ease-out;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 2s ease-in-out infinite;
    }
  }

  &__percentage {
    font-size: $font-sm;
    color: $primary-color;
    font-weight: $font-semibold;
    min-width: 35px;
    text-align: right;
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

@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

// Responsive adjustments
@media (max-width: 640px) {
  .skills {
    &__grid {
      grid-template-columns: 1fr;
    }

    &__card {
      padding: 1.5rem;
    }

    &__icon {
      font-size: 2.5rem;
    }

    &__name {
      font-size: $font-base;
    }

    &__description {
      font-size: $font-xs;
    }
  }
}

// Estados especiales
.skills__card {
  // Efecto especial para habilidades de alto nivel
  &:has(.skills__level-fill[style*="95%"]),
  &:has(.skills__level-fill[style*="90%"]) {
    .skills__level-fill {
      background: linear-gradient(90deg, $accent-color, $primary-color);

      &::after {
        animation-duration: 1.5s;
      }
    }
  }
}

// Modo oscuro
@include dark-mode {
  .skills {
    background: $bg-medium;

    &__card {
      background: $bg-dark;
      color: $text-light;
    }

    &__name {
      color: $text-white;
    }

    &__description {
      color: $text-light;
    }
  }
}
</style>
