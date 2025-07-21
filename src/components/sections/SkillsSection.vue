<!-- src/components/sections/SkillsSection.vue -->
<template>
  <section id="skills" class="skills section-padding">
    <!-- Efectos de fondo industriales -->
    <div class="skills__background">
      <div class="skills__metal-pattern"></div>
      <div class="skills__floating-gears">
        <div v-for="i in 6" :key="i" class="skills__gear" :style="getGearStyle(i)">⚙️</div>
      </div>
      <div class="skills__energy-lines">
        <div v-for="i in 4" :key="i" class="skills__energy-line" :style="getEnergyLineStyle(i)"></div>
      </div>
    </div>

    <div class="container">
      <!-- Título principal -->
      <div class="skills__header">
        <h3 class="section-title skills__title">
          <span class="skills__title-pre">Arsenal de</span>
          <span class="skills__title-main">Habilidades</span>
        </h3>
        <p class="skills__subtitle">Técnicas especializadas en mecanizado de precisión</p>
      </div>

      <!-- Skills por categorías -->
      <div class="skills__categories">
        <div
          v-for="(category, categoryIndex) in skillsData"
          :key="category.category"
          class="skills__category"
          :style="{ animationDelay: `${categoryIndex * 0.3}s` }"
        >
          <!-- Cabecera de categoría -->
          <div class="skills__category-header">
            <div class="skills__category-indicator">
              <div class="skills__indicator-light"></div>
              <span class="skills__category-title">{{ category.category }}</span>
            </div>
            <div class="skills__category-decoration">
              <div class="skills__decoration-line"></div>
              <div class="skills__decoration-gear">🔧</div>
            </div>
          </div>

          <!-- Grid de habilidades -->
          <div class="skills__grid">
            <div
              v-for="(skill, skillIndex) in category.items"
              :key="skill.name"
              class="skills__card"
              :style="{ animationDelay: `${(categoryIndex * 6 + skillIndex) * 0.1}s` }"
              @mouseenter="activateSkill(skill, categoryIndex, skillIndex)"
              @mouseleave="deactivateSkill()"
            >
              <!-- Panel de control -->
              <div class="skills__control-panel">
                <div class="skills__status-lights">
                  <div class="skills__status-light skills__status-light--power"></div>
                  <div class="skills__status-light skills__status-light--ready"></div>
                  <div class="skills__status-light skills__status-light--active"
                       :class="{ 'skills__status-light--on': activeSkill?.name === skill.name }"></div>
                </div>
                <div class="skills__level-display">
                  <span class="skills__level-value">{{ skill.level }}%</span>
                </div>
              </div>

              <!-- Contenido principal -->
              <div class="skills__content">
                <div class="skills__icon-container">
                  <div class="skills__icon-background"></div>
                  <span class="skills__icon">{{ skill.icon }}</span>
                  <div class="skills__icon-energy"
                       :class="{ 'skills__icon-energy--active': activeSkill?.name === skill.name }">
                    <div v-for="j in 6" :key="j" class="skills__energy-particle" :style="getParticleStyle(j)"></div>
                  </div>
                </div>

                <div class="skills__info">
                  <h4 class="skills__name">{{ skill.name }}</h4>
                  <p class="skills__description">{{ skill.description }}</p>
                </div>
              </div>

              <!-- Barra de progreso industrial -->
              <div class="skills__progress-container">
                <div class="skills__progress-track">
                  <div class="skills__progress-bar" :style="{ width: skill.level + '%' }">
                    <div class="skills__progress-glow"></div>
                  </div>
                  <div class="skills__progress-markers">
                    <div v-for="mark in 5" :key="mark" class="skills__progress-marker"
                         :style="{ left: (mark * 20) + '%' }"></div>
                  </div>
                </div>
                <div class="skills__progress-label">
                  <span class="skills__progress-text">Dominio</span>
                  <span class="skills__progress-percentage">{{ skill.level }}%</span>
                </div>
              </div>

              <!-- Efectos hover -->
              <div class="skills__hover-effects">
                <div class="skills__shimmer-effect"></div>
                <div class="skills__border-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Resumen de estadísticas -->
      <div class="skills__summary">
        <div class="skills__summary-card">
          <div class="skills__summary-header">
            <h4>Resumen Técnico</h4>
            <div class="skills__summary-indicator">
              <div class="skills__indicator-pulse"></div>
              <span>ACTIVO</span>
            </div>
          </div>
          <div class="skills__summary-stats">
            <div class="skills__stat" v-for="stat in summaryStats" :key="stat.label">
              <div class="skills__stat-value">{{ stat.value }}</div>
              <div class="skills__stat-label">{{ stat.label }}</div>
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
  name: 'SkillsSection',
  props: {
    skillsData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const activeSkill = ref(null)

    const summaryStats = computed(() => {
      const allSkills = props.skillsData.flatMap(category => category.items)
      const avgLevel = Math.round(allSkills.reduce((sum, skill) => sum + skill.level, 0) / allSkills.length)

      return [
        { label: 'Habilidades', value: allSkills.length },
        { label: 'Categorías', value: props.skillsData.length },
        { label: 'Nivel Promedio', value: avgLevel + '%' },
        { label: 'Especialización', value: 'CNC' }
      ]
    })

    const activateSkill = (skill, categoryIndex, skillIndex) => {
      activeSkill.value = skill
    }

    const deactivateSkill = () => {
      activeSkill.value = null
    }

    const getGearStyle = (index) => {
      const positions = [
        { top: '15%', left: '10%', size: '2rem', duration: '20s' },
        { top: '25%', right: '15%', size: '1.5rem', duration: '15s', reverse: true },
        { bottom: '30%', left: '5%', size: '1.8rem', duration: '25s' },
        { top: '60%', right: '8%', size: '1.2rem', duration: '18s', reverse: true },
        { bottom: '20%', right: '25%', size: '1.6rem', duration: '22s' },
        { top: '45%', left: '3%', size: '1.3rem', duration: '16s', reverse: true }
      ]

      return {
        ...positions[index - 1],
        fontSize: positions[index - 1]?.size || '1.5rem',
        animationDuration: positions[index - 1]?.duration || '20s',
        animationDirection: positions[index - 1]?.reverse ? 'reverse' : 'normal'
      }
    }

    const getEnergyLineStyle = (index) => {
      const lines = [
        { top: '10%', left: '0%', width: '60%', delay: '0s' },
        { top: '35%', right: '0%', width: '45%', delay: '1s' },
        { bottom: '25%', left: '0%', width: '70%', delay: '2s' },
        { bottom: '5%', right: '0%', width: '55%', delay: '3s' }
      ]

      return {
        ...lines[index - 1],
        animationDelay: lines[index - 1]?.delay || '0s'
      }
    }

    const getParticleStyle = (index) => {
      const angle = (index - 1) * 60
      const radius = 25
      const x = Math.cos(angle * Math.PI / 180) * radius
      const y = Math.sin(angle * Math.PI / 180) * radius

      return {
        transform: `translate(${x}px, ${y}px)`,
        animationDelay: `${index * 0.1}s`
      }
    }

    return {
      activeSkill,
      summaryStats,
      activateSkill,
      deactivateSkill,
      getGearStyle,
      getEnergyLineStyle,
      getParticleStyle
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.skills {
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

  &__metal-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: pattern-shift 30s linear infinite;
  }

  &__floating-gears {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__gear {
    position: absolute;
    color: rgba(245, 158, 11, 0.15);
    animation: rotate-gear 20s linear infinite;
  }

  &__energy-lines {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  &__energy-line {
    position: absolute;
    height: 2px;
    background: linear-gradient(90deg,
      transparent 0%,
      rgba(245, 158, 11, 0.6) 50%,
      transparent 100%);
    animation: energy-flow 3s ease-in-out infinite;
  }

  .container {
    position: relative;
    z-index: 10;
  }

  // HEADER SECTION
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
    letter-spacing: 3px;
    animation: glow-text 2s ease-in-out infinite alternate;

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
    position: relative;

    @media (min-width: 768px) {
      font-size: 3.5rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 4px;
      background: linear-gradient(90deg, transparent, #f59e0b, transparent);
      border-radius: 2px;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: rgba(248, 250, 252, 0.8);
    max-width: 600px;
    margin: 0 auto;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  // CATEGORÍAS
  &__categories {
    margin-bottom: 4rem;
  }

  &__category {
    margin-bottom: 3rem;
    animation: fade-in-up 0.8s ease both;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__category-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__category-indicator {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  &__indicator-light {
    width: 12px;
    height: 12px;
    background: #f59e0b;
    border-radius: 50%;
    box-shadow: 0 0 15px rgba(245, 158, 11, 0.8);
    animation: pulse-light 2s infinite;
  }

  &__category-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8fafc;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }

  &__category-decoration {
    display: flex;
    align-items: center;
    gap: 1rem;

    @media (max-width: 767px) {
      display: none;
    }
  }

  &__decoration-line {
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, #f59e0b);
  }

  &__decoration-gear {
    font-size: 1.25rem;
    color: #f59e0b;
    animation: rotate-gear 15s linear infinite reverse;
  }

  // GRID DE SKILLS
  &__grid {
    display: grid;
    gap: 1.5rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    background: rgba(248, 250, 252, 0.05);
    border: 1px solid rgba(248, 250, 252, 0.1);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    transition: all 0.4s ease;
    backdrop-filter: blur(10px);
    animation: fade-in-up 0.8s ease both;

    &:hover {
      transform: translateY(-8px);
      background: rgba(248, 250, 252, 0.08);
      border-color: #f59e0b;
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.3),
        0 0 20px rgba(245, 158, 11, 0.3);

      .skills__shimmer-effect {
        transform: translateX(100%);
      }

      .skills__border-glow {
        opacity: 1;
      }

      .skills__icon-energy--active {
        opacity: 1;
      }
    }
  }

  // PANEL DE CONTROL
  &__control-panel {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding-bottom: 0.75rem;
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__status-lights {
    display: flex;
    gap: 0.5rem;
  }

  &__status-light {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transition: all 0.3s ease;

    &--power {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
    }

    &--ready {
      background: #3b82f6;
      box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
    }

    &--active {
      background: #6b7280;

      &.skills__status-light--on {
        background: #f59e0b;
        box-shadow: 0 0 12px rgba(245, 158, 11, 0.8);
      }
    }
  }

  &__level-display {
    background: rgba(0, 0, 0, 0.3);
    padding: 0.25rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  &__level-value {
    font-size: 0.875rem;
    font-weight: 700;
    color: #f59e0b;
    font-family: 'Courier New', monospace;
  }

  // CONTENIDO PRINCIPAL
  &__content {
    display: flex;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  &__icon-container {
    position: relative;
    flex-shrink: 0;
  }

  &__icon-background {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
    border-radius: 50%;
    border: 2px solid rgba(245, 158, 11, 0.2);
  }

  &__icon {
    display: block;
    font-size: 2rem;
    position: relative;
    z-index: 2;
    text-align: center;
    width: 60px;
    height: 60px;
    line-height: 60px;
  }

  &__icon-energy {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;

    &--active {
      opacity: 1;
    }
  }

  &__energy-particle {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 4px;
    height: 4px;
    background: #f59e0b;
    border-radius: 50%;
    animation: particle-orbit 2s linear infinite;
  }

  &__info {
    flex: 1;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 0.5rem;
  }

  &__description {
    font-size: 0.9rem;
    color: rgba(248, 250, 252, 0.7);
    line-height: 1.5;
    margin: 0;
  }

  // BARRA DE PROGRESO
  &__progress-container {
    margin-bottom: 1rem;
  }

  &__progress-track {
    position: relative;
    height: 8px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  &__progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #f59e0b, #fbbf24);
    border-radius: 4px;
    position: relative;
    transition: width 2s ease 0.5s;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg,
        transparent 0%,
        rgba(255, 255, 255, 0.3) 50%,
        transparent 100%);
      animation: progress-shine 2s linear infinite;
    }
  }

  &__progress-markers {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &__progress-marker {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(248, 250, 252, 0.2);
  }

  &__progress-label {
    display: flex;
    justify-content: space-between;
    font-size: 0.75rem;
    color: rgba(248, 250, 252, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  // EFECTOS HOVER
  &__hover-effects {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 1rem;
    pointer-events: none;
  }

  &__shimmer-effect {
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

  &__border-glow {
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

  &__indicator-pulse {
    width: 10px;
    height: 10px;
    background: #f59e0b;
    border-radius: 50%;
    animation: pulse-light 1.5s infinite;
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
  }
}

// ANIMACIONES
@keyframes pattern-shift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 30px); }
}

@keyframes rotate-gear {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes energy-flow {
  0%, 100% { opacity: 0.3; transform: scaleX(0.5); }
  50% { opacity: 1; transform: scaleX(1); }
}

@keyframes glow-text {
  0% { text-shadow: 0 0 5px rgba(245, 158, 11, 0.5); }
  100% { text-shadow: 0 0 20px rgba(245, 158, 11, 0.8), 0 0 30px rgba(245, 158, 11, 0.6); }
}

@keyframes pulse-light {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.2); }
}

@keyframes particle-orbit {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes progress-shine {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
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
</style>
