<!-- src/components/sections/SkillsSection.vue - ÉPICO INDUSTRIAL -->
<template>
  <section id="skills" class="skills section-padding">
    <!-- Partículas de aceite industrial -->
    <div class="skills__oil-particles">
      <div v-for="i in 30" :key="i" class="skills__oil-drop" :style="getOilDropStyle(i)"></div>
    </div>

    <!-- Chispas de máquina -->
    <div class="skills__machine-sparks">
      <div v-for="i in 15" :key="i" class="skills__machine-spark" :style="getMachineSparkStyle(i)"></div>
    </div>

    <!-- Rejilla de taller -->
    <div class="skills__workshop-grid"></div>

    <!-- Efectos de vapor -->
    <div class="skills__steam-effects">
      <div v-for="i in 8" :key="i" class="skills__steam" :style="getSteamStyle(i)"></div>
    </div>

    <div class="container">
      <!-- TÍTULO ÉPICO CON EFECTOS DE SOLDADURA -->
      <h3 class="section-title skills__main-title">
        <span class="skills__title-pre">Arsenal de</span>
        <span class="skills__title-main">Habilidades</span>
        <div class="skills__title-welding">
          <div v-for="i in 4" :key="i" class="skills__weld-spark" :style="getWeldSparkStyle(i)"></div>
        </div>
      </h3>

      <!-- CATEGORIES CON EFECTOS INDUSTRIALES -->
      <div v-for="(category, categoryIndex) in skillsData" :key="category.category" class="skills__category">
        <!-- Título de categoría con efectos -->
        <div class="skills__category-header" :style="{ animationDelay: `${categoryIndex * 0.2}s` }">
          <h4 class="skills__category-title">{{ category.category }}</h4>
          <div class="skills__category-line"></div>
          <div class="skills__category-gear">⚙️</div>
        </div>

        <!-- GRID DE SKILLS - NIVEL MÁXIMO -->
        <div class="skills__grid">
          <div
            v-for="(skill, index) in category.items"
            :key="skill.name"
            class="skills__card"
            :style="{ animationDelay: `${(categoryIndex * 6 + index) * 0.1}s` }"
            @mouseenter="activateSkill(skill, index)"
            @mouseleave="deactivateSkill(skill, index)"
          >
            <!-- Marco industrial -->
            <div class="skills__card-frame">
              <div class="skills__frame-corner" v-for="i in 4" :key="i"></div>
              <div class="skills__frame-rivet" v-for="i in 8" :key="i" :style="getRivetStyle(i)"></div>
            </div>

            <!-- Indicador de estado -->
            <div class="skills__status-panel">
              <div class="skills__status-light skills__status-light--power"></div>
              <div class="skills__status-light skills__status-light--ready"></div>
              <div class="skills__status-light skills__status-light--active"></div>
            </div>

            <!-- Contenido principal -->
            <div class="skills__content">
              <!-- Ícono con efectos especiales -->
              <div class="skills__icon-container">
                <div class="skills__icon-base">
                  <div class="skills__icon-glow"></div>
                  <div class="skills__icon">{{ skill.icon }}</div>
                  <div class="skills__icon-energy"></div>
                </div>

                <!-- Anillo de energía -->
                <div class="skills__energy-ring"></div>

                <!-- Partículas de skill -->
                <div class="skills__skill-particles">
                  <div v-for="j in 6" :key="j" class="skills__skill-particle" :style="getSkillParticleStyle(j)"></div>
                </div>
              </div>

              <!-- Información del skill -->
              <div class="skills__info">
                <h5 class="skills__name">{{ skill.name }}</h5>
                <p class="skills__description">{{ skill.description }}</p>
              </div>

              <!-- BARRA DE PROGRESO ÉPICA -->
              <div class="skills__progress-container">
                <div class="skills__progress-header">
                  <span class="skills__progress-label">Dominio</span>
                  <span class="skills__percentage" ref="percentageRef">{{ skill.level }}%</span>
                </div>

                <div class="skills__progress-track">
                  <!-- Segmentos de la barra -->
                  <div class="skills__progress-segments">
                    <div v-for="i in 10" :key="i" class="skills__progress-segment"></div>
                  </div>

                  <!-- Barra principal -->
                  <div
                    class="skills__progress-fill"
                    :style="{ '--skill-level': skill.level + '%' }"
                    :ref="`progressBar_${categoryIndex}_${index}`"
                  >
                    <!-- Efecto de soldadura en la punta -->
                    <div class="skills__progress-weld"></div>

                    <!-- Chispas en la barra -->
                    <div class="skills__progress-sparks">
                      <div v-for="k in 3" :key="k" class="skills__progress-spark" :style="getProgressSparkStyle(k)"></div>
                    </div>
                  </div>

                  <!-- Overlay de brillo -->
                  <div class="skills__progress-shine"></div>

                  <!-- Indicador de temperatura -->
                  <div class="skills__temperature-gauge">
                    <div class="skills__temperature-indicator" :style="{ '--temp-level': (skill.level / 100) }"></div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Efectos especiales de hover -->
            <div class="skills__hover-effects">
              <div class="skills__glow-effect"></div>
              <div class="skills__laser-scan"></div>
              <div class="skills__energy-field"></div>
            </div>

            <!-- Panel de circuitos -->
            <div class="skills__circuit-pattern">
              <div v-for="i in 5" :key="i" class="skills__circuit-line" :style="getCircuitStyle(i)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, nextTick } from 'vue'

export default {
  name: 'SkillsSection',
  props: {
    skillsData: {
      type: Array,
      required: true
    }
  },
  setup() {
    const percentageRef = ref(null)

    // Estilos dinámicos para efectos
    const getOilDropStyle = (index) => {
      const delay = Math.random() * 6
      const duration = 4 + Math.random() * 4
      const left = Math.random() * 100
      const size = Math.random() * 3 + 1

      return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`
      }
    }

    const getMachineSparkStyle = (index) => {
      const delay = Math.random() * 3
      const left = 20 + Math.random() * 60
      const top = 20 + Math.random() * 60

      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`
      }
    }

    const getSteamStyle = (index) => {
      const delay = Math.random() * 4
      const left = 10 + Math.random() * 80
      const size = 20 + Math.random() * 30

      return {
        left: `${left}%`,
        bottom: '0px',
        width: `${size}px`,
        height: `${size}px`,
        animationDelay: `${delay}s`
      }
    }

    const getWeldSparkStyle = (index) => {
      const angle = (index * 90) + 'deg'
      const delay = index * 0.3

      return {
        transform: `rotate(${angle}) translateY(-30px)`,
        animationDelay: `${delay}s`
      }
    }

    const getRivetStyle = (index) => {
      const positions = [
        { top: '10px', left: '10px' },
        { top: '10px', right: '10px' },
        { bottom: '10px', left: '10px' },
        { bottom: '10px', right: '10px' },
        { top: '50%', left: '10px' },
        { top: '50%', right: '10px' },
        { top: '10px', left: '50%' },
        { bottom: '10px', left: '50%' }
      ]

      return positions[index] || {}
    }

    const getSkillParticleStyle = (index) => {
      const angle = (index * 60) + 'deg'
      const delay = index * 0.2

      return {
        transform: `rotate(${angle}) translateY(-35px)`,
        animationDelay: `${delay}s`
      }
    }

    const getProgressSparkStyle = (index) => {
      const positions = ['25%', '50%', '75%']
      const delay = index * 0.3

      return {
        left: positions[index],
        animationDelay: `${delay}s`
      }
    }

    const getCircuitStyle = (index) => {
      const patterns = [
        { width: '60%', height: '1px', top: '20%', left: '20%' },
        { width: '1px', height: '40%', top: '30%', left: '70%' },
        { width: '40%', height: '1px', top: '60%', left: '40%' },
        { width: '1px', height: '30%', top: '15%', left: '30%' },
        { width: '30%', height: '1px', top: '80%', left: '10%' }
      ]

      return patterns[index] || {}
    }

    // Activar efectos especiales
    const activateSkill = (skill, index) => {
      // Vibración táctil
      if (navigator.vibrate) navigator.vibrate(40)

      // Aquí podrías agregar efectos de sonido
      console.log(`Activating skill: ${skill.name}`)
    }

    const deactivateSkill = (skill, index) => {
      // Reset effects
      console.log(`Deactivating skill: ${skill.name}`)
    }

    // Animar barras de progreso
    const animateProgressBars = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skills__progress-fill')

            progressBars.forEach((bar, index) => {
              setTimeout(() => {
                bar.style.transform = 'scaleX(1)'
                bar.classList.add('skills__progress-fill--animate')
              }, index * 150)
            })
          }
        })
      }, { threshold: 0.3 })

      const skillsElement = document.querySelector('.skills')
      if (skillsElement) {
        observer.observe(skillsElement)
      }
    }

    onMounted(() => {
      nextTick(() => {
        animateProgressBars()
      })
    })

    return {
      percentageRef,
      getOilDropStyle,
      getMachineSparkStyle,
      getSteamStyle,
      getWeldSparkStyle,
      getRivetStyle,
      getSkillParticleStyle,
      getProgressSparkStyle,
      getCircuitStyle,
      activateSkill,
      deactivateSkill
    }
  }
}
</script>

<style lang="scss" scoped>
.skills {
  background:
    radial-gradient(circle at 20% 30%, rgba(15, 23, 42, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
    linear-gradient(135deg, #f1f5f9 0%, #f8fafc 50%, #e2e8f0 100%);
  position: relative;
  overflow: hidden;

  // Partículas de aceite
  &__oil-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  &__oil-drop {
    position: absolute;
    background: radial-gradient(circle, #64748b 0%, #475569 50%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    animation: oil-drop infinite ease-in-out;
  }

  // Chispas de máquina
  &__machine-sparks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }

  &__machine-spark {
    position: absolute;
    width: 2px;
    height: 2px;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 60%, transparent 100%);
    border-radius: 50%;
    animation: machine-spark infinite ease-out;
  }

  // Rejilla de taller
  &__workshop-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(71, 85, 105, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(71, 85, 105, 0.05) 1px, transparent 1px);
    background-size: 60px 60px;
    animation: workshop-move 30s linear infinite;
    z-index: 1;
  }

  // Efectos de vapor
  &__steam-effects {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 200px;
    pointer-events: none;
    z-index: 1;
  }

  &__steam {
    position: absolute;
    background: radial-gradient(circle, rgba(203, 213, 225, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    animation: steam-rise infinite ease-out;
  }

  .container {
    position: relative;
    z-index: 10;
  }

  // TÍTULO ÉPICO
  &__main-title {
    position: relative;
    margin-bottom: 4rem;
    text-align: center;

    .section-title {
      margin: 0;
    }
  }

  &__title-pre {
    display: block;
    font-size: 1.5rem;
    color: #64748b;
    font-weight: 600;
    animation: title-forge 1s ease-out;

    @media (min-width: 768px) {
      font-size: 2rem;
    }
  }

  &__title-main {
    display: block;
    font-size: 2.5rem;
    background: linear-gradient(45deg, #0f172a 0%, #1e293b 25%, #f59e0b 50%, #fbbf24 75%, #0f172a 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation:
      title-forge 1s ease-out 0.3s both,
      industrial-glow 4s ease-in-out infinite,
      metal-shine 5s ease-in-out infinite alternate;
    font-weight: 900;
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
      width: 0;
      height: 4px;
      background: linear-gradient(90deg, #0f172a, #f59e0b, #0f172a);
      animation: forge-line 2s ease-out 1.5s forwards;
      box-shadow: 0 0 15px currentColor;
    }
  }

  &__title-welding {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 80px;
    pointer-events: none;
  }

  &__weld-spark {
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: weld-spark 2s ease-out infinite;
    opacity: 0;
  }

  // CATEGORÍAS
  &__category {
    margin-bottom: 4rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__category-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    animation: category-enter 1s ease-out both;
  }

  &__category-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    text-transform: uppercase;
    letter-spacing: 1px;
    position: relative;

    @media (min-width: 768px) {
      font-size: 1.75rem;
    }

    &::before {
      content: '';
      position: absolute;
      left: -10px;
      top: 50%;
      transform: translateY(-50%);
      width: 4px;
      height: 100%;
      background: linear-gradient(180deg, #2563eb, #f59e0b);
    }
  }

  &__category-line {
    flex: 1;
    height: 2px;
    background: linear-gradient(90deg, #2563eb, transparent, #f59e0b);
    position: relative;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.8), transparent);
      animation: line-pulse 3s ease-in-out infinite;
    }
  }

  &__category-gear {
    font-size: 1.5rem;
    animation: gear-spin 8s linear infinite;
    filter: drop-shadow(0 0 5px #f59e0b);
  }

  // GRID DE SKILLS
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem;
    }

    @media (min-width: 968px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // CARDS ÉPICAS
  &__card {
    position: relative;
    padding: 2rem;
    background:
      linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f1f5f9 100%);
    border-radius: 1rem;
    box-shadow:
      0 4px 6px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(71, 85, 105, 0.1),
      inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;
    animation: skill-card-enter 1s ease-out both;
    border: 2px solid transparent;

    @media (min-width: 768px) {
      padding: 2.5rem;
    }

    &:hover {
      transform: translateY(-12px) scale(1.03);
      box-shadow:
        0 30px 60px rgba(15, 23, 42, 0.15),
        0 0 0 1px rgba(37, 99, 235, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
      border-color: rgba(245, 158, 11, 0.4);

      .skills__glow-effect {
        opacity: 1;
        transform: scale(1.2);
      }

      .skills__laser-scan {
        opacity: 1;
        animation: laser-sweep 2s ease-in-out;
      }

      .skills__energy-field {
        opacity: 1;
        animation: energy-ripple 1.5s ease-in-out infinite;
      }

      .skills__icon {
        transform: scale(1.2) rotateY(360deg);
        filter: drop-shadow(0 0 20px #f59e0b);
      }

      .skills__energy-ring {
        opacity: 1;
        animation: energy-ring-pulse 1s ease-in-out infinite;
      }

      .skills__skill-particles {
        opacity: 1;
      }

      .skills__status-panel {
        opacity: 1;
      }

      .skills__circuit-pattern {
        opacity: 1;
        animation: circuit-flow 2s ease-in-out infinite;
      }
    }
  }

  // Marco industrial
  &__card-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 2;
  }

  &__frame-corner {
    position: absolute;
    width: 8px;
    height: 8px;
    background: linear-gradient(45deg, #475569, #64748b);

    &:nth-child(1) {
      top: 5px;
      left: 5px;
      clip-path: polygon(0 0, 100% 0, 100% 40%, 40% 40%, 40% 100%, 0 100%);
    }

    &:nth-child(2) {
      top: 5px;
      right: 5px;
      clip-path: polygon(0 0, 100% 0, 100% 100%, 60% 100%, 60% 40%, 0 40%);
    }

    &:nth-child(3) {
      bottom: 5px;
      left: 5px;
      clip-path: polygon(0 0, 40% 0, 40% 60%, 100% 60%, 100% 100%, 0 100%);
    }

    &:nth-child(4) {
      bottom: 5px;
      right: 5px;
      clip-path: polygon(60% 0, 100% 0, 100% 100%, 0 100%, 0 60%, 60% 60%);
    }
  }

  &__frame-rivet {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #94a3b8, #64748b);
    border-radius: 50%;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  // Panel de estado
  &__status-panel {
    position: absolute;
    top: 15px;
    right: 15px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__status-light {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    box-shadow: 0 0 8px currentColor;

    &--power {
      background: #22c55e;
      animation: status-pulse 2s ease-in-out infinite;
    }

    &--ready {
      background: #f59e0b;
      animation: status-pulse 2s ease-in-out infinite 0.5s;
    }

    &--active {
      background: #2563eb;
      animation: status-pulse 2s ease-in-out infinite 1s;
    }
  }

  // Contenido principal
  &__content {
    position: relative;
    z-index: 3;
  }

  // Ícono con efectos
  &__icon-container {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  &__icon-base {
    position: relative;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background:
      radial-gradient(circle at 30% 30%, #2563eb 0%, #1d4ed8 70%),
      conic-gradient(from 45deg, #2563eb, #f59e0b, #2563eb);
    border-radius: 50%;
    box-shadow:
      0 8px 16px rgba(37, 99, 235, 0.3),
      inset 0 2px 4px rgba(255, 255, 255, 0.2);

    @media (min-width: 768px) {
      width: 6rem;
      height: 6rem;
    }
  }

  &__icon-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, transparent 70%);
    border-radius: 50%;
    animation: icon-glow-pulse 3s ease-in-out infinite alternate;
  }

  &__icon {
    font-size: 2rem;
    filter: brightness(0) invert(1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    position: relative;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  &__icon-energy {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 120%;
    height: 120%;
    background:
      radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 50%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: energy-pulse 4s ease-in-out infinite;
  }

  &__energy-ring {
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border: 2px solid transparent;
    border-radius: 50%;
    background: linear-gradient(45deg, #2563eb, #f59e0b, #2563eb) border-box;
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: subtract;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__skill-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__skill-particle {
    position: absolute;
    width: 3px;
    height: 3px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: skill-particle-orbit 3s ease-out infinite;
    opacity: 0;
  }

  // Información del skill
  &__info {
    text-align: center;
    margin-bottom: 2rem;
  }

  &__name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;

    @media (min-width: 768px) {
      font-size: 1.375rem;
    }
  }

  &__description {
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;

    @media (min-width: 768px) {
      font-size: 0.95rem;
    }
  }

  // BARRA DE PROGRESO ÉPICA
  &__progress-container {
    position: relative;
  }

  &__progress-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.75rem;
  }

  &__progress-label {
    font-size: 0.75rem;
    font-weight: 600;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__percentage {
    font-size: 0.875rem;
    font-weight: 700;
    color: #f59e0b;
    font-family: 'Courier New', monospace;
  }

  &__progress-track {
    position: relative;
    height: 12px;
    background:
      linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%);
    border-radius: 6px;
    overflow: hidden;
    box-shadow:
      inset 0 2px 4px rgba(0, 0, 0, 0.1),
      0 1px 0 rgba(255, 255, 255, 0.5);
  }

  &__progress-segments {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    z-index: 1;
  }

  &__progress-segment {
    flex: 1;
    border-right: 1px solid rgba(148, 163, 184, 0.3);

    &:last-child {
      border-right: none;
    }
  }

  &__progress-fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: var(--skill-level);
    background:
      linear-gradient(135deg, #2563eb 0%, #3b82f6 25%, #f59e0b 75%, #fbbf24 100%);
    border-radius: 6px;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 1.5s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 2;
    position: relative;
    overflow: hidden;

    &--animate {
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
        animation: progress-shine 2s ease-in-out infinite;
      }
    }
  }

  &__progress-weld {
    position: absolute;
    top: 50%;
    right: -2px;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 70%);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: weld-glow 1s ease-in-out infinite alternate;
    box-shadow: 0 0 8px #f59e0b;
  }

  &__progress-sparks {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__progress-spark {
    position: absolute;
    top: 50%;
    width: 2px;
    height: 2px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    border-radius: 50%;
    transform: translateY(-50%);
    animation: progress-spark-fly 2s ease-out infinite;
    opacity: 0;
  }

  &__progress-shine {
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 40%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
    border-radius: 5px 5px 0 0;
    z-index: 3;
  }

  &__temperature-gauge {
    position: absolute;
    top: -8px;
    right: 10px;
    width: 20px;
    height: 3px;
    background: linear-gradient(90deg, #22c55e, #f59e0b, #ef4444);
    border-radius: 2px;
    z-index: 4;
  }

  &__temperature-indicator {
    height: 100%;
    width: calc(var(--temp-level) * 100%);
    background: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    transition: width 1.5s ease;
  }

  // Efectos especiales de hover
  &__hover-effects {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 1;
  }

  &__glow-effect {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
    border-radius: 1.5rem;
    opacity: 0;
    transform: scale(0.9);
    transition: all 0.4s ease;
  }

  &__laser-scan {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.2), transparent);
    opacity: 0;
  }

  &__energy-field {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.05) 0%, transparent 50%);
    transform: translate(-50%, -50%);
    opacity: 0;
  }

  // Patrón de circuitos
  &__circuit-pattern {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 1;
  }

  &__circuit-line {
    position: absolute;
    background: linear-gradient(45deg, rgba(37, 99, 235, 0.2), rgba(245, 158, 11, 0.2));
    opacity: 0.5;
  }
}

// ===== ANIMACIONES ÉPICAS =====

@keyframes oil-drop {
  0%, 100% {
    opacity: 0;
    transform: translateY(100vh) rotate(0deg);
  }
  10%, 90% {
    opacity: 0.6;
  }
  50% {
    transform: translateY(-10vh) rotate(180deg);
    opacity: 1;
  }
}

@keyframes machine-spark {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes workshop-move {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(60px, 60px);
  }
}

@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  50% {
    opacity: 0.4;
    transform: translateY(-100px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-200px) scale(1.5);
  }
}

@keyframes title-forge {
  from {
    opacity: 0;
    transform: translateY(30px) skewX(-10deg);
  }
  to {
    opacity: 1;
    transform: translateY(0) skewX(0deg);
  }
}

@keyframes industrial-glow {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes metal-shine {
  from {
    text-shadow:
      0 0 20px rgba(245, 158, 11, 0.5),
      0 0 30px rgba(15, 23, 42, 0.3);
  }
  to {
    text-shadow:
      0 0 30px rgba(245, 158, 11, 0.8),
      0 0 40px rgba(15, 23, 42, 0.6),
      0 0 50px rgba(245, 158, 11, 0.4);
  }
}

@keyframes forge-line {
  from {
    width: 0;
  }
  to {
    width: 80%;
  }
}

@keyframes weld-spark {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-30px) scale(0);
  }
}

@keyframes category-enter {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes line-pulse {
  0%, 100% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(100%);
  }
}

@keyframes gear-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes skill-card-enter {
  from {
    opacity: 0;
    transform: translateY(50px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes laser-sweep {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes energy-ripple {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.3);
    opacity: 0.3;
  }
}

@keyframes energy-ring-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.1);
    opacity: 1;
  }
}

@keyframes circuit-flow {
  0%, 100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.5);
  }
}

@keyframes status-pulse {
  0%, 70%, 100% {
    opacity: 0.3;
  }
  35% {
    opacity: 1;
  }
}

@keyframes icon-glow-pulse {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 0.7;
  }
}

@keyframes energy-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.3;
  }
}

@keyframes skill-particle-orbit {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-35px) scale(0);
  }
}

@keyframes progress-shine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

@keyframes weld-glow {
  from {
    opacity: 0.5;
    transform: translateY(-50%) scale(1);
  }
  to {
    opacity: 1;
    transform: translateY(-50%) scale(1.2);
  }
}

@keyframes progress-spark-fly {
  0% {
    opacity: 0;
    transform: translateY(-50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translateY(-50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-50%) translateY(-10px) scale(0);
  }
}

// ===== RESPONSIVE OPTIMIZATIONS =====

@media (max-width: 767px) {
  .skills {
    &__title-pre {
      font-size: 1.25rem;
    }

    &__title-main {
      font-size: 2rem;
    }

    &__card {
      padding: 1.5rem;

      &:hover {
        transform: translateY(-6px) scale(1.01);
      }
    }

    &__icon-base {
      width: 4rem;
      height: 4rem;
    }

    &__icon {
      font-size: 1.75rem;
    }

    &__name {
      font-size: 1.125rem;
    }

    // Reducir complejidad de animaciones en móvil
    &__oil-drop {
      animation-duration: 6s !important;
    }

    &__machine-spark {
      animation-duration: 2s !important;
    }
  }
}

@media (max-width: 320px) {
  .skills {
    &__title-main {
      font-size: 1.75rem;
    }

    &__card {
      padding: 1.25rem;
    }

    &__icon-base {
      width: 3.5rem;
      height: 3.5rem;
    }

    &__icon {
      font-size: 1.5rem;
    }
  }
}

// Modo de ahorro de batería
@media (prefers-reduced-motion: reduce) {
  .skills {
    &__oil-drop,
    &__machine-spark,
    &__steam,
    &__energy-ring,
    &__skill-particles {
      animation: none !important;
    }

    &__title-main {
      animation: none !important;
      background: #f59e0b;
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
      background-clip: initial;
      color: #f59e0b;
    }

    &__workshop-grid {
      animation: none !important;
    }
  }
}
</style>
