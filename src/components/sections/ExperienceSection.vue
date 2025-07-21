<!-- src/components/sections/ExperienceSection.vue -->
<template>
  <section id="experience" class="experience section-padding">
    <!-- Efectos de fondo industriales -->
    <div class="experience__background">
      <div class="experience__metal-texture"></div>
      <div class="experience__floating-sparks">
        <div v-for="i in 10" :key="i" class="experience__spark" :style="getSparkStyle(i)"></div>
      </div>
      <div class="experience__blueprint-lines">
        <div v-for="i in 5" :key="i" class="experience__blueprint-line" :style="getBlueprintLineStyle(i)"></div>
      </div>
    </div>

    <div class="container">
      <!-- Header -->
      <div class="experience__header">
        <h3 class="section-title experience__title">
          <span class="experience__title-pre">Trayectoria</span>
          <span class="experience__title-main">Profesional</span>
        </h3>
        <p class="experience__subtitle">
          Evolución constante en el mundo del mecanizado industrial
        </p>
      </div>

      <!-- Timeline -->
      <div class="experience__timeline">
        <!-- Línea central -->
        <div class="experience__timeline-line">
          <div class="experience__timeline-progress" :style="{ height: timelineProgress + '%' }"></div>
        </div>

        <!-- Items de experiencia -->
        <div
          v-for="(exp, index) in experienceData"
          :key="exp.id"
          class="experience__item"
          :class="{
            'experience__item--current': index === 0,
            'experience__item--left': index % 2 === 0,
            'experience__item--right': index % 2 === 1
          }"
          :style="{ animationDelay: `${index * 0.3}s` }"
        >
          <!-- Marcador -->
          <div class="experience__marker">
            <div class="experience__marker-outer">
              <div class="experience__marker-inner">
                <span class="experience__marker-icon">{{ getMarkerIcon(index) }}</span>
              </div>
            </div>

            <!-- Efectos del marcador -->
            <div v-if="index === 0" class="experience__marker-effects">
              <div v-for="j in 3" :key="j" class="experience__marker-ring" :style="{ animationDelay: `${j * 0.5}s` }"></div>
            </div>
          </div>

          <!-- Card de contenido -->
          <div class="experience__card">
            <!-- Header de la card -->
            <div class="experience__card-header">
              <div class="experience__status-panel">
                <div class="experience__status-light" :class="{ 'experience__status-light--active': index === 0 }"></div>
                <span class="experience__period">{{ exp.period }}</span>
              </div>

              <!-- Badge de estado -->
              <div class="experience__badge" :class="{ 'experience__badge--current': index === 0 }">
                {{ index === 0 ? 'ACTUAL' : 'COMPLETADO' }}
              </div>
            </div>

            <!-- Información principal -->
            <div class="experience__card-content">
              <h4 class="experience__position">{{ exp.position }}</h4>
              <h5 class="experience__company">{{ exp.company }}</h5>
              <p class="experience__description">{{ exp.description }}</p>

              <!-- Responsabilidades -->
              <div v-if="exp.responsibilities" class="experience__details">
                <h6 class="experience__details-title">
                  <span class="experience__details-icon">📋</span>
                  Responsabilidades
                </h6>
                <ul class="experience__details-list">
                  <li v-for="responsibility in exp.responsibilities" :key="responsibility">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>

              <!-- Logros -->
              <div v-if="exp.achievements" class="experience__details">
                <h6 class="experience__details-title">
                  <span class="experience__details-icon">🏆</span>
                  Logros Destacados
                </h6>
                <ul class="experience__details-list">
                  <li v-for="achievement in exp.achievements" :key="achievement">
                    {{ achievement }}
                  </li>
                </ul>
              </div>

              <!-- Tecnologías -->
              <div v-if="exp.technologies" class="experience__technologies">
                <div class="experience__tech-label">
                  <span class="experience__tech-icon">⚙️</span>
                  Tecnologías utilizadas:
                </div>
                <div class="experience__tech-tags">
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

            <!-- Efectos hover -->
            <div class="experience__card-effects">
              <div class="experience__card-shimmer"></div>
              <div class="experience__card-glow"></div>
            </div>
          </div>

          <!-- Conector -->
          <div class="experience__connector"></div>
        </div>
      </div>

      <!-- Resumen de carrera -->
      <div class="experience__summary">
        <div class="experience__summary-card">
          <div class="experience__summary-header">
            <h4>Resumen Profesional</h4>
            <div class="experience__summary-indicator">
              <div class="experience__indicator-dot"></div>
              <span>{{ experienceData.length }} POSICIONES</span>
            </div>
          </div>

          <div class="experience__summary-stats">
            <div class="experience__stat" v-for="stat in careerStats" :key="stat.label">
              <div class="experience__stat-value">{{ stat.value }}</div>
              <div class="experience__stat-label">{{ stat.label }}</div>
              <div class="experience__stat-bar">
                <div class="experience__stat-progress" :style="{ width: stat.progress + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'ExperienceSection',
  props: {
    experienceData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const timelineProgress = ref(0)

    const careerStats = computed(() => [
      { label: 'Años Experiencia', value: '3+', progress: 85 },
      { label: 'Empresas', value: props.experienceData.length, progress: 75 },
      { label: 'Proyectos', value: '100+', progress: 95 },
      { label: 'Crecimiento', value: '350%', progress: 100 }
    ])

    const getMarkerIcon = (index) => {
      const icons = ['⚙️', '🔧', '🎯', '📈', '🏭', '💼']
      return icons[index] || '⚙️'
    }

    const getSparkStyle = (index) => {
      const positions = [
        { top: '8%', left: '12%', delay: '0s' },
        { top: '22%', right: '15%', delay: '1s' },
        { bottom: '35%', left: '8%', delay: '2s' },
        { top: '45%', right: '10%', delay: '1.5s' },
        { bottom: '18%', right: '20%', delay: '3s' },
        { top: '65%', left: '5%', delay: '2.5s' },
        { bottom: '45%', right: '8%', delay: '0.5s' },
        { top: '78%', left: '18%', delay: '3.5s' },
        { top: '35%', right: '25%', delay: '1.2s' },
        { bottom: '25%', left: '22%', delay: '2.8s' }
      ]

      return {
        ...positions[index - 1],
        animationDelay: positions[index - 1]?.delay || '0s'
      }
    }

    const getBlueprintLineStyle = (index) => {
      const lines = [
        { top: '15%', left: '0', width: '35%', delay: '0s' },
        { top: '35%', right: '0', width: '40%', delay: '1s' },
        { bottom: '30%', left: '0', width: '30%', delay: '2s' },
        { top: '65%', right: '0', width: '25%', delay: '1.5s' },
        { bottom: '10%', left: '0', width: '45%', delay: '3s' }
      ]

      return {
        ...lines[index - 1],
        animationDelay: lines[index - 1]?.delay || '0s'
      }
    }

    onMounted(() => {
      // Animar progreso del timeline
      setTimeout(() => {
        timelineProgress.value = 100
      }, 1000)
    })

    return {
      timelineProgress,
      careerStats,
      getMarkerIcon,
      getSparkStyle,
      getBlueprintLineStyle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.experience {
  background: linear-gradient(135deg,
    #0f172a 0%,
    #1e293b 50%,
    #334155 100%);
  color: #f8fafc;
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

  &__metal-texture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(45deg, transparent 25%, rgba(245, 158, 11, 0.02) 25%),
      linear-gradient(-45deg, transparent 25%, rgba(245, 158, 11, 0.02) 25%),
      linear-gradient(45deg, rgba(245, 158, 11, 0.02) 75%, transparent 75%),
      linear-gradient(-45deg, rgba(245, 158, 11, 0.02) 75%, transparent 75%);
    background-size: 20px 20px;
    animation: texture-shift 40s linear infinite;
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
    background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
    border-radius: 50%;
    animation: spark-twinkle 3s ease-in-out infinite;
  }

  &__blueprint-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__blueprint-line {
    position: absolute;
    height: 1px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(245, 158, 11, 0.4) 50%,
      transparent 100%);
    animation: blueprint-pulse 4s ease-in-out infinite;
  }

  .container {
    position: relative;
    z-index: 10;
  }

  // HEADER
  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  &__title {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin: 0 0 1rem 0;
  }

  &__title-pre {
    font-size: 1.25rem;
    color: rgba(248, 250, 252, 0.7);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 2px;
    animation: fade-in-down 0.8s ease;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__title-main {
    font-size: 2.5rem;
    font-weight: 900;
    background: linear-gradient(45deg, #f59e0b 30%, #fbbf24 70%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fade-in-up 0.8s ease 0.2s both;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: rgba(248, 250, 252, 0.8);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  // TIMELINE
  &__timeline {
    position: relative;
    margin-bottom: 4rem;
  }

  &__timeline-line {
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 4px;
    background: rgba(248, 250, 252, 0.1);
    transform: translateX(-50%);
    border-radius: 2px;
    z-index: 1;

    @media (max-width: 767px) {
      left: 1.5rem;
    }
  }

  &__timeline-progress {
    width: 100%;
    background: linear-gradient(to bottom, #f59e0b, #fbbf24);
    border-radius: 2px;
    transition: height 2s ease 0.5s;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom,
        rgba(255, 255, 255, 0.3) 0%,
        transparent 50%,
        rgba(255, 255, 255, 0.3) 100%);
      animation: progress-shine 3s linear infinite;
    }
  }

  // ITEMS DE EXPERIENCIA
  &__item {
    position: relative;
    margin-bottom: 4rem;
    animation: fade-in-up 0.8s ease both;

    &:last-child {
      margin-bottom: 0;
    }

    &--left {
      @media (min-width: 768px) {
        padding-right: calc(50% + 2rem);

        .experience__card {
          margin-right: 0;
        }

        .experience__connector {
          right: calc(50% - 2rem);
          left: auto;
        }
      }
    }

    &--right {
      @media (min-width: 768px) {
        padding-left: calc(50% + 2rem);

        .experience__card {
          margin-left: 0;
        }

        .experience__connector {
          left: calc(50% - 2rem);
          right: auto;
        }
      }
    }

    &--current {
      .experience__marker {
        .experience__marker-outer {
          border-color: #f59e0b;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
        }

        .experience__marker-inner {
          background: #f59e0b;
          box-shadow: 0 0 15px rgba(245, 158, 11, 0.8);
        }
      }

      .experience__card {
        border-color: #f59e0b;
        box-shadow:
          0 15px 35px rgba(0, 0, 0, 0.3),
          0 0 25px rgba(245, 158, 11, 0.2);
      }
    }

    @media (max-width: 767px) {
      padding-left: 4rem;
    }
  }

  // MARCADOR
  &__marker {
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
    z-index: 3;

    @media (max-width: 767px) {
      left: 1.5rem;
    }
  }

  &__marker-outer {
    width: 50px;
    height: 50px;
    border: 3px solid rgba(248, 250, 252, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(15, 23, 42, 0.9);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
  }

  &__marker-inner {
    width: 30px;
    height: 30px;
    background: rgba(248, 250, 252, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  }

  &__marker-icon {
    font-size: 1rem;
  }

  &__marker-effects {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &__marker-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 2px solid #f59e0b;
    border-radius: 50%;
    animation: marker-pulse 2s infinite;
  }

  // CARD DE CONTENIDO
  &__card {
    background: rgba(248, 250, 252, 0.05);
    border: 1px solid rgba(248, 250, 252, 0.1);
    border-radius: 1rem;
    padding: 2rem;
    position: relative;
    backdrop-filter: blur(15px);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(248, 250, 252, 0.08);
      border-color: rgba(245, 158, 11, 0.3);
      transform: translateY(-5px);

      .experience__card-shimmer {
        transform: translateX(100%);
      }

      .experience__card-glow {
        opacity: 1;
      }
    }
  }

  &__card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__status-panel {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  &__status-light {
    width: 10px;
    height: 10px;
    background: rgba(248, 250, 252, 0.3);
    border-radius: 50%;
    transition: all 0.3s ease;

    &--active {
      background: #f59e0b;
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.8);
      animation: status-pulse 2s infinite;
    }
  }

  &__period {
    font-size: 0.875rem;
    color: #f59e0b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Courier New', monospace;
  }

  &__badge {
    background: rgba(107, 114, 128, 0.2);
    color: #9ca3af;
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid rgba(107, 114, 128, 0.3);

    &--current {
      background: rgba(245, 158, 11, 0.2);
      color: #f59e0b;
      border-color: rgba(245, 158, 11, 0.3);
      animation: badge-glow 2s infinite;
    }
  }

  // CONTENIDO DE LA CARD
  &__card-content {

  }

  &__position {
    font-size: 1.375rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.5rem;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  &__company {
    font-size: 1.125rem;
    font-weight: 600;
    color: #f59e0b;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 0.95rem;
    color: rgba(248, 250, 252, 0.8);
    line-height: 1.6;
    margin-bottom: 1.5rem;
  }

  // DETALLES
  &__details {
    margin-bottom: 1.5rem;

    &:last-of-type {
      margin-bottom: 1rem;
    }
  }

  &__details-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #f8fafc;
    margin-bottom: 0.75rem;
  }

  &__details-icon {
    font-size: 1.125rem;
  }

  &__details-list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
      position: relative;
      padding-left: 1.5rem;
      margin-bottom: 0.5rem;
      font-size: 0.9rem;
      color: rgba(248, 250, 252, 0.7);
      line-height: 1.5;

      &::before {
        content: '▸';
        position: absolute;
        left: 0;
        color: #f59e0b;
        font-weight: bold;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }
  }

  // TECNOLOGÍAS
  &__technologies {
    border-top: 1px solid rgba(248, 250, 252, 0.1);
    padding-top: 1rem;
  }

  &__tech-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #f8fafc;
    margin-bottom: 0.75rem;
  }

  &__tech-icon {
    font-size: 1rem;
  }

  &__tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tech-tag {
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
    padding: 0.375rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(245, 158, 11, 0.3);
    transition: all 0.3s ease;

    &:hover {
      background: rgba(245, 158, 11, 0.3);
      transform: scale(1.05);
    }
  }

  // EFECTOS DE CARD
  &__card-effects {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1rem;
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
      rgba(255, 255, 255, 0.1) 50%,
      transparent 100%);
    transition: transform 0.6s ease;
    border-radius: 1rem;
  }

  &__card-glow {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #f59e0b, transparent, #f59e0b);
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: -1;
  }

  // CONECTOR
  &__connector {
    position: absolute;
    top: 2.5rem;
    width: 2rem;
    height: 2px;
    background: linear-gradient(90deg, #f59e0b, transparent);
    z-index: 2;

    @media (max-width: 767px) {
      display: none;
    }
  }

  // RESUMEN
  &__summary {
    margin-top: 3rem;
  }

  &__summary-card {
    background: rgba(248, 250, 252, 0.08);
    border: 1px solid rgba(248, 250, 252, 0.15);
    border-radius: 1rem;
    padding: 2rem;
    backdrop-filter: blur(15px);
  }

  &__summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);

    h4 {
      font-size: 1.5rem;
      font-weight: 700;
      color: #f8fafc;
      margin: 0;
    }
  }

  &__summary-indicator {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.875rem;
    color: #f59e0b;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  &__indicator-dot {
    width: 10px;
    height: 10px;
    background: #f59e0b;
    border-radius: 50%;
    animation: pulse-dot 2s infinite;
  }

  &__summary-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__stat {
    text-align: center;
  }

  &__stat-value {
    font-size: 2rem;
    font-weight: 800;
    color: #f59e0b;
    margin-bottom: 0.5rem;
    font-family: 'Courier New', monospace;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__stat-label {
    font-size: 0.875rem;
    color: rgba(248, 250, 252, 0.7);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
    margin-bottom: 0.75rem;
  }

  &__stat-bar {
    height: 4px;
    background: rgba(248, 250, 252, 0.1);
    border-radius: 2px;
    overflow: hidden;
    margin: 0 auto;
    max-width: 80px;
  }

  &__stat-progress {
    height: 100%;
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
    border-radius: 2px;
    transition: width 2s ease 1s;
  }
}

// ANIMACIONES
@keyframes texture-shift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(20px, 20px); }
}

@keyframes spark-twinkle {
  0%, 100% {
    opacity: 0.3;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.5);
  }
}

@keyframes blueprint-pulse {
  0%, 100% { opacity: 0.4; transform: scaleX(0.8); }
  50% { opacity: 1; transform: scaleX(1); }
}

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-30px);
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

@keyframes progress-shine {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

@keyframes marker-pulse {
  0% {
    width: 60px;
    height: 60px;
    opacity: 1;
  }
  100% {
    width: 120px;
    height: 120px;
    opacity: 0;
  }
}

@keyframes status-pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.2); }
}

@keyframes badge-glow {
  0%, 100% { box-shadow: 0 0 5px rgba(245, 158, 11, 0.3); }
  50% { box-shadow: 0 0 20px rgba(245, 158, 11, 0.8); }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.3); }
}

// MODO OSCURO ADICIONAL
@include dark-mode {
  .experience {
    &__card {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
    }

    &__summary-card {
      background: rgba(30, 41, 59, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
