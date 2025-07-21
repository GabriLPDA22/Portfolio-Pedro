<!-- src/components/sections/AboutSection.vue -->
<template>
  <section id="about" class="about section-padding">
    <!-- Efectos de fondo industriales -->
    <div class="about__background">
      <div class="about__metal-grid"></div>
      <div class="about__floating-sparks">
        <div v-for="i in 8" :key="i" class="about__spark" :style="getSparkStyle(i)"></div>
      </div>
    </div>

    <div class="container">
      <!-- Título con efectos industriales -->
      <div class="about__header">
        <h3 class="section-title about__title">
          <span class="about__title-pre">Conoce al</span>
          <span class="about__title-main">Especialista</span>
        </h3>
        <div class="about__title-decoration">
          <div class="about__gear-small">⚙️</div>
        </div>
      </div>

      <!-- Contenido principal -->
      <div class="about__content">
        <!-- Descripción principal -->
        <div class="about__description-card">
          <div class="about__card-header">
            <div class="about__profile-indicator">
              <div class="about__indicator-dot"></div>
              <span>PERFIL TÉCNICO</span>
            </div>
          </div>
          <p class="about__description" style="color: white">{{ aboutData.description }}</p>
        </div>

        <!-- Highlights mejorados -->
        <div class="about__highlights">
          <div v-for="(highlight, index) in aboutData.highlights" :key="highlight.title" class="about__highlight-card"
            :class="{ 'about__highlight-card--active': activeCard === index }"
            :style="{ animationDelay: `${index * 0.2}s` }" @mouseenter="setActiveCard(index)"
            @mouseleave="setActiveCard(-1)">
            <!-- Indicador de estado -->
            <div class="about__card-status">
              <div class="about__status-light" :class="{ 'about__status-light--active': activeCard === index }"></div>
              <span class="about__status-text">{{ highlight.year }}</span>
            </div>

            <!-- Contenido de la card -->
            <div class="about__card-content">
              <div class="about__card-icon">
                <span class="about__icon">{{ highlight.icon }}</span>
                <div class="about__icon-glow"></div>
              </div>

              <div class="about__card-info">
                <h4 class="about__card-title">{{ highlight.title }}</h4>
                <p class="about__card-description">{{ highlight.description }}</p>
              </div>
            </div>

            <!-- Efectos de hover -->
            <div class="about__card-effects">
              <div class="about__card-shimmer"></div>
            </div>
          </div>
        </div>

        <!-- Estadísticas impactantes -->
        <div class="about__stats">
          <div class="about__stat-item" v-for="(stat, index) in stats" :key="stat.label"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="about__stat-value">{{ stat.value }}</div>
            <div class="about__stat-label">{{ stat.label }}</div>
            <div class="about__stat-bar">
              <div class="about__stat-progress" :style="{ width: stat.progress + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'AboutSection',
  props: {
    aboutData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const activeCard = ref(-1)

    const stats = [
      { label: 'Años Experiencia', value: '3+', progress: 85 },
      { label: 'Proyectos Completados', value: '150+', progress: 92 },
      { label: 'Precisión Tolerancia', value: '±0.01mm', progress: 98 },
      { label: 'Satisfacción Cliente', value: '100%', progress: 100 }
    ]

    const setActiveCard = (index) => {
      activeCard.value = index
    }

    const getSparkStyle = (index) => {
      const positions = [
        { top: '10%', left: '15%', delay: '0s' },
        { top: '25%', right: '20%', delay: '0.5s' },
        { bottom: '30%', left: '10%', delay: '1s' },
        { top: '60%', right: '15%', delay: '1.5s' },
        { bottom: '15%', left: '25%', delay: '2s' },
        { top: '40%', right: '30%', delay: '2.5s' },
        { bottom: '45%', right: '10%', delay: '3s' },
        { top: '75%', left: '35%', delay: '3.5s' }
      ]

      return {
        ...positions[index - 1],
        animationDelay: positions[index - 1]?.delay || '0s'
      }
    }

    return {
      activeCard,
      stats,
      setActiveCard,
      getSparkStyle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.about {
  background: linear-gradient(135deg,
    #{$bg-light} 0%,
    #{lighten($bg-light, 2%)} 50%,
    #{darken($bg-light, 1%)} 100%);
  position: relative;
  overflow: hidden;

  // EFECTOS DE FONDO
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  &__metal-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(15, 23, 42, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: grid-shift 60s linear infinite;
  }

  &__floating-sparks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__spark {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, $accent-color 0%, transparent 70%);
    border-radius: 50%;
    animation: spark-float 4s ease-in-out infinite;
  }

  .container {
    position: relative;
    z-index: 10;
  }

  // HEADER SECTION
  &__header {
    text-align: center;
    margin-bottom: 4rem;
    position: relative;
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  &__title-pre {
    font-size: 1.25rem;
    color: $text-light;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: slide-down 0.8s ease;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__title-main {
    font-size: 2.5rem;
    font-weight: 800;
    background: linear-gradient(45deg, $primary-color 30%, $accent-color 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: slide-up 0.8s ease 0.2s both;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  &__title-decoration {
    position: absolute;
    top: 50%;
    right: -3rem;
    transform: translateY(-50%);

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__gear-small {
    font-size: 1.5rem;
    animation: rotate-slow 10s linear infinite;
  }

  // DESCRIPCIÓN PRINCIPAL
  &__description-card {
    background: white;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
    margin-bottom: 3rem;
    border: 1px solid rgba(245, 158, 11, 0.1);
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(90deg, $accent-color, $accent-light);
    }
  }

  &__card-header {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  &__profile-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: $text-light;
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__indicator-dot {
    width: 8px;
    height: 8px;
    background: $accent-color;
    border-radius: 50%;
    animation: pulse-dot 2s infinite;
  }

  &__description {
    font-size: 1.125rem;
    line-height: 1.7;
    color: $text-primary;
    margin: 0;
  }

  // HIGHLIGHTS MEJORADOS
  &__highlights {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 3rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
  }

  &__highlight-card {
    background: white;
    border-radius: 1rem;
    padding: 1.5rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.05);
    transition: all 0.4s ease;
    position: relative;
    overflow: hidden;
    animation: fade-in-up 0.8s ease both;

    &:hover,
    &--active {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      border-color: $accent-color;

      .about__icon-glow {
        opacity: 1;
        transform: scale(1);
      }

      .about__card-shimmer {
        transform: translateX(100%);
      }

      .about__status-light {
        background: $accent-color;
        box-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
      }
    }
  }

  &__card-status {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  &__status-light {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #e2e8f0;
    transition: all 0.3s ease;

    &--active {
      background: $accent-color;
      box-shadow: 0 0 15px rgba(245, 158, 11, 0.6);
    }
  }

  &__status-text {
    font-size: 0.875rem;
    color: $text-light;
    font-weight: 600;
  }

  &__card-content {
    display: flex;
    gap: 1rem;
  }

  &__card-icon {
    position: relative;
    flex-shrink: 0;
  }

  &__icon {
    display: block;
    font-size: 2rem;
    position: relative;
    z-index: 2;
  }

  &__icon-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.8);
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: all 0.4s ease;
  }

  &__card-info {
    flex: 1;
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $text-primary;
    margin-bottom: 0.5rem;
  }

  &__card-description {
    font-size: 0.95rem;
    color: $text-light;
    line-height: 1.6;
    margin: 0;
  }

  &__card-effects {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__card-shimmer {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.4) 50%,
        transparent 100%);
    transition: transform 0.6s ease;
  }

  // ESTADÍSTICAS
  &__stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
    }
  }

  &__stat-item {
    text-align: center;
    animation: fade-in-up 0.8s ease both;
  }

  &__stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: $primary-color;
    margin-bottom: 0.25rem;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__stat-label {
    font-size: 0.875rem;
    color: $text-light;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.75rem;
  }

  &__stat-bar {
    height: 4px;
    background: #e2e8f0;
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
    max-width: 80px;
  }

  &__stat-progress {
    height: 100%;
    background: linear-gradient(90deg, $accent-color, $accent-light);
    border-radius: 2px;
    transition: width 2s ease 0.5s;
  }
}

// ANIMACIONES
@keyframes grid-shift {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(50px, 50px);
  }
}

@keyframes spark-float {

  0%,
  100% {
    opacity: 0.3;
    transform: translateY(0px) scale(1);
  }

  50% {
    opacity: 0.8;
    transform: translateY(-20px) scale(1.2);
  }
}

@keyframes rotate-slow {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes pulse-dot {

  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }

  50% {
    opacity: 0.5;
    transform: scale(1.2);
  }
}

@keyframes slide-down {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// MODO OSCURO
@include dark-mode {
  .about {
    background: linear-gradient(135deg,
      #0f172a 0%,
      #1e293b 50%,
      #0a0f1c 100%);

    &__description-card,
    &__highlight-card {
      background: $bg-medium;
      color: $text-light;
      border-color: rgba(255, 255, 255, 0.1);
    }

    &__card-title {
      color: $text-white;
    }

    &__stat-value {
      color: $accent-color;
    }
  }
}
</style>
