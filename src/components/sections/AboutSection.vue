<!-- src/components/sections/AboutSection.vue - COMPLETO SIN ERRORES -->
<template>
  <section id="about" class="about section-padding">
    <!-- Partículas flotantes como en Hero -->
    <div class="about__particles">
      <div v-for="i in 25" :key="i" class="about__particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Rejilla industrial como Hero -->
    <div class="about__industrial-grid"></div>

    <!-- Chispas como Hero -->
    <div class="about__sparks">
      <div v-for="i in 12" :key="i" class="about__spark" :style="getSparkStyle(i)"></div>
    </div>

    <div class="container">
      <h3 class="section-title about__main-title">
        <span class="about__title-line">Conoce al</span>
        <span class="about__title-highlight">Especialista</span>
        <div class="about__title-sparks">
          <div v-for="i in 6" :key="i" class="about__title-spark" :style="getTitleSparkStyle(i)"></div>
        </div>
      </h3>

      <div class="about__content">
        <div class="about__text">
          <!-- Descripción con efecto de máquina de escribir -->
          <div class="about__description-container">
            <p class="about__description" ref="descriptionRef">{{ aboutData.description }}</p>
            <div class="about__typing-cursor"></div>
          </div>

          <!-- Cards CON EFECTOS ÉPICOS COMO HERO -->
          <div class="about__highlights">
            <div
              v-for="(highlight, index) in aboutData.highlights"
              :key="highlight.title"
              class="about__highlight-card"
              :style="{ animationDelay: `${index * 0.3}s` }"
              @mouseenter="activateCard(index)"
            >
              <!-- Marco metálico épico -->
              <div class="about__card-frame">
                <div class="about__card-corner about__card-corner--top-left"></div>
                <div class="about__card-corner about__card-corner--top-right"></div>
                <div class="about__card-corner about__card-corner--bottom-left"></div>
                <div class="about__card-corner about__card-corner--bottom-right"></div>
              </div>

              <!-- Contenido de la card -->
              <div class="about__highlight-header">
                <div class="about__highlight-icon-container">
                  <div class="about__icon-ring"></div>
                  <div class="about__highlight-icon">{{ highlight.icon }}</div>
                  <div class="about__icon-energy">
                    <div v-for="j in 8" :key="j" class="about__icon-spark" :style="getIconSparkStyle(j)"></div>
                  </div>
                </div>
                <div class="about__highlight-content">
                  <h4 class="about__highlight-title">{{ highlight.title }}</h4>
                  <span class="about__highlight-year">{{ highlight.year }}</span>
                </div>
              </div>

              <p class="about__highlight-description">{{ highlight.description }}</p>

              <!-- Efectos especiales COMO HERO -->
              <div class="about__card-glow"></div>
              <div class="about__card-laser"></div>
              <div class="about__card-energy"></div>
            </div>
          </div>
        </div>

        <!-- AVATAR SECTION - COMO ENGRANAJES HERO -->
        <div class="about__image">
          <div class="about__profile-container">
            <!-- Anillos giratorios como Hero -->
            <div class="about__rotating-ring about__rotating-ring--outer"></div>
            <div class="about__rotating-ring about__rotating-ring--middle"></div>
            <div class="about__rotating-ring about__rotating-ring--inner"></div>

            <!-- Avatar con efectos como Hero -->
            <div class="about__profile-main" @mouseenter="activateProfile">
              <div class="about__profile-placeholder">
                <div class="about__profile-icon">👤</div>
                <div class="about__profile-energy"></div>
                <div class="about__profile-pulse"></div>
              </div>

              <!-- Partículas orbitales como Hero -->
              <div class="about__orbital-particles">
                <div v-for="i in 12" :key="i" class="about__orbital-particle" :style="getOrbitalStyle(i)"></div>
              </div>

              <!-- Efectos de estado -->
              <div class="about__status-indicators">
                <div class="about__status-light about__status-light--active"></div>
                <div class="about__status-light about__status-light--standby"></div>
                <div class="about__status-light about__status-light--ready"></div>
              </div>
            </div>

            <!-- Panel de control como Hero -->
            <div class="about__control-panel">
              <div class="about__control-line" v-for="i in 3" :key="i"></div>
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
  name: 'AboutSection',
  props: {
    aboutData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const descriptionRef = ref(null)

    // TODAS LAS FUNCIONES DE ESTILOS
    const getParticleStyle = (index) => {
      const delay = Math.random() * 8
      const duration = 6 + Math.random() * 4
      const left = Math.random() * 100
      const size = Math.random() * 2 + 1

      return {
        left: `${left}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        width: `${size}px`,
        height: `${size}px`
      }
    }

    const getSparkStyle = (index) => {
      const delay = Math.random() * 3
      const left = 20 + Math.random() * 60
      const top = 20 + Math.random() * 60

      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`
      }
    }

    const getTitleSparkStyle = (index) => {
      const angle = (index * 60) + 'deg'
      const delay = index * 0.5

      return {
        transform: `rotate(${angle}) translateY(-40px)`,
        animationDelay: `${delay}s`
      }
    }

    const getIconSparkStyle = (index) => {
      const angle = (index * 45) + 'deg'
      const delay = index * 0.2

      return {
        transform: `rotate(${angle}) translateY(-25px)`,
        animationDelay: `${delay}s`
      }
    }

    const getOrbitalStyle = (index) => {
      const angle = (index * 30) + 'deg'
      const radius = 60 + Math.random() * 30
      const delay = index * 0.1

      return {
        transform: `rotate(${angle}) translateX(${radius}px)`,
        animationDelay: `${delay}s`
      }
    }

    // Funciones de interacción
    const activateCard = (index) => {
      if (navigator.vibrate) navigator.vibrate(25)
    }

    const activateProfile = () => {
      if (navigator.vibrate) navigator.vibrate([30, 20, 30])
    }

    // Efecto de máquina de escribir
    const typeWriter = () => {
      if (!descriptionRef.value) return

      const text = descriptionRef.value.textContent
      descriptionRef.value.textContent = ''

      let i = 0
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          descriptionRef.value.textContent += text.charAt(i)
          i++
        } else {
          clearInterval(typeInterval)
        }
      }, 40)
    }

    onMounted(() => {
      nextTick(() => {
        setTimeout(typeWriter, 1500)
      })
    })

    return {
      descriptionRef,
      getParticleStyle,
      getSparkStyle,
      getTitleSparkStyle,
      getIconSparkStyle,
      getOrbitalStyle,
      activateCard,
      activateProfile
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
  position: relative;
  overflow: hidden;

  // Partículas flotantes COMO HERO
  &__particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  &__particle {
    position: absolute;
    background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    animation: float-particle infinite ease-in-out;
  }

  // Rejilla industrial COMO HERO
  &__industrial-grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    animation: grid-move 20s linear infinite;
    z-index: 1;

    @media (min-width: 768px) {
      background-image:
        linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
    }
  }

  // Chispas de soldadura COMO HERO
  &__sparks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }

  &__spark {
    position: absolute;
    width: 2px;
    height: 2px;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 50%, transparent 100%);
    border-radius: 50%;
    animation: spark infinite ease-out;

    @media (min-width: 768px) {
      width: 3px;
      height: 3px;
    }
  }

  .container {
    position: relative;
    z-index: 10;
  }

  // TÍTULO ÉPICO COMO HERO
  &__main-title {
    position: relative;
    margin-bottom: 4rem;

    .section-title {
      margin: 0;
    }
  }

  &__title-line {
    display: block;
    color: #e2e8f0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    animation: slide-in-left 1s ease-out;
    font-size: 2rem;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 2.5rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
  }

  &__title-highlight {
    display: block;
    background: linear-gradient(45deg, #f59e0b 0%, #fbbf24 25%, #f59e0b 50%, #d97706 75%, #f59e0b 100%);
    background-size: 400% 400%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation:
      slide-in-right 1s ease-out,
      gradient-shift 3s ease-in-out infinite,
      glow-pulse 2s ease-in-out infinite alternate;
    position: relative;
    font-size: 2.5rem;
    font-weight: 900;

    @media (min-width: 768px) {
      font-size: 3rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, #f59e0b, #fbbf24);
      animation: expand-line 2s ease-out 1.5s forwards;
      box-shadow: 0 0 8px #f59e0b;

      @media (min-width: 768px) {
        bottom: -10px;
        height: 4px;
        box-shadow: 0 0 10px #f59e0b;
      }
    }
  }

  &__title-sparks {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100px;
    height: 100px;
    pointer-events: none;
  }

  &__title-spark {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24 0%, transparent 70%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: spark-orbit 3s ease-out infinite;
    opacity: 0;
  }

  // CONTENIDO PRINCIPAL
  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (min-width: 768px) {
      gap: 3rem;
    }

    @media (min-width: 968px) {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    @media (min-width: 1200px) {
      gap: 6rem;
    }
  }

  &__text {
    text-align: center;
    width: 100%;
    animation: slide-in-left 0.8s ease-out 0.2s both;

    @media (min-width: 968px) {
      text-align: left;
    }
  }

  // Descripción con máquina de escribir
  &__description-container {
    position: relative;
    margin-bottom: 2rem;

    @media (min-width: 768px) {
      margin-bottom: 3rem;
    }
  }

  &__description {
    font-size: 1rem;
    color: #cbd5e1;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    max-width: 90%;
    margin: 0 auto;

    @media (min-width: 480px) {
      font-size: 1.125rem;
      line-height: 1.7;
    }

    @media (min-width: 768px) {
      font-size: 1.25rem;
      max-width: 100%;
    }

    @media (min-width: 968px) {
      margin: 0;
    }

    @media (min-width: 1024px) {
      font-size: 1.375rem;
    }
  }

  &__typing-cursor {
    display: inline-block;
    width: 2px;
    height: 1.5rem;
    background: #f59e0b;
    margin-left: 2px;
    animation: cursor-blink 1s infinite;
  }

  // CARDS ÉPICAS COMO HERO
  &__highlights {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.25rem;

    @media (min-width: 640px) {
      gap: 1.5rem;
    }

    @media (min-width: 768px) {
      gap: 2rem;
    }
  }

  &__highlight-card {
    position: relative;
    padding: 1.25rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    box-shadow:
      0 2px 4px rgba(0, 0, 0, 0.05),
      0 0 0 1px rgba(255, 255, 255, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    overflow: hidden;
    animation: fadeInUp 0.8s ease-out both;

    @media (min-width: 480px) {
      padding: 1.5rem;
    }

    @media (min-width: 768px) {
      padding: 2rem;
      border-radius: 1rem;
    }

    // Efecto hover ÉPICO COMO HERO
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow:
        0 20px 40px rgba(37, 99, 235, 0.15),
        0 0 0 1px rgba(37, 99, 235, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      border-color: rgba(37, 99, 235, 0.2);

      .about__card-glow {
        opacity: 1;
        transform: scale(1.1);
      }

      .about__card-laser {
        opacity: 1;
        animation: laser-scan 2s ease-in-out;
      }

      .about__card-energy {
        opacity: 1;
        animation: energy-pulse 1.5s ease-in-out infinite;
      }

      .about__highlight-icon {
        transform: scale(1.1) rotateY(180deg);
        filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.6));
      }

      .about__highlight-title {
        color: #2563eb;
      }

      @media (min-width: 768px) {
        transform: translateY(-12px) scale(1.03);
        box-shadow:
          0 25px 50px rgba(37, 99, 235, 0.2),
          0 0 0 1px rgba(37, 99, 235, 0.15),
          inset 0 1px 0 rgba(255, 255, 255, 0.4);
      }
    }

    // Línea de acento lateral COMO HERO
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: linear-gradient(180deg, #2563eb 0%, #f59e0b 100%);
      border-radius: 0 2px 2px 0;
      transition: width 0.3s ease;
    }

    &:hover::before {
      width: 6px;
    }
  }

  // Marco metálico COMO HERO
  &__card-frame {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 5;
  }

  &__card-corner {
    position: absolute;
    width: 12px;
    height: 12px;
    background:
      radial-gradient(circle, #64748b 0%, #475569 50%, #334155 100%);
    opacity: 0;
    transition: opacity 0.3s ease;

    &--middle {
      top: -10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
      background: linear-gradient(135deg, #f59e0b, transparent, #2563eb, transparent) border-box;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: subtract;
      animation: ring-rotate 10s linear infinite reverse;

      @media (min-width: 768px) {
        top: -15px;
        left: -15px;
        right: -15px;
        bottom: -15px;
      }
    }

    &--inner {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(225deg, #2563eb, transparent, #f59e0b, transparent) border-box;
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: subtract;
      animation: ring-rotate 8s linear infinite;
    }
  }

  &__profile-main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.4s ease;

    &:hover {
      transform: scale(1.05);

      .about__profile-energy {
        opacity: 1;
        animation: energy-wave 2s ease-in-out infinite;
      }

      .about__orbital-particles {
        animation-duration: 2s;
      }

      .about__status-indicators {
        opacity: 1;
      }
    }
  }

  &__profile-placeholder {
    width: 120px;
    height: 120px;
    background:
      radial-gradient(circle at 30% 30%, #2563eb 0%, #1d4ed8 70%),
      conic-gradient(from 45deg, #2563eb, #f59e0b, #2563eb);
    background-size: 100% 100%, 200% 200%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    position: relative;
    overflow: hidden;
    animation: profile-energy 6s ease-in-out infinite;
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.9),
      0 0 0 8px rgba(37, 99, 235, 0.2),
      0 25px 50px rgba(37, 99, 235, 0.3),
      inset 0 0 50px rgba(255, 255, 255, 0.1);

    @media (min-width: 480px) {
      width: 140px;
      height: 140px;
      font-size: 3rem;
    }

    @media (min-width: 768px) {
      width: 180px;
      height: 180px;
      font-size: 4rem;
      box-shadow:
        0 0 0 6px rgba(255, 255, 255, 0.9),
        0 0 0 12px rgba(37, 99, 235, 0.2),
        0 25px 50px rgba(37, 99, 235, 0.25),
        inset 0 0 50px rgba(255, 255, 255, 0.1);
    }

    // Efecto de shimmer COMO HERO
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background:
        conic-gradient(from 0deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer-rotate 4s ease-in-out infinite;
      transform: rotate(45deg);
    }
  }

  &__profile-icon {
    filter: brightness(0) invert(1);
    z-index: 3;
    position: relative;
    animation: icon-float 6s ease-in-out infinite;
  }

  &__profile-energy {
    position: absolute;
    top: -30px;
    left: -30px;
    right: -30px;
    bottom: -30px;
    background:
      radial-gradient(circle, rgba(245, 158, 11, 0.2) 0%, rgba(37, 99, 235, 0.1) 50%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &__profile-pulse {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    border: 2px solid rgba(245, 158, 11, 0.4);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: pulse-ring 3s ease-in-out infinite;
    pointer-events: none;
  }

  // Partículas orbitales COMO HERO
  &__orbital-particles {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    animation: orbital-rotation 20s linear infinite;
    pointer-events: none;
  }

  &__orbital-particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 70%, transparent 100%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: particle-orbit 3s ease-in-out infinite;
    opacity: 0;
  }

  // Indicadores de estado COMO HERO
  &__status-indicators {
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &__status-light {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    box-shadow: 0 0 10px currentColor;

    &--active {
      background: #22c55e;
      animation: status-blink 2s ease-in-out infinite;
    }

    &--standby {
      background: #f59e0b;
      animation: status-blink 2s ease-in-out infinite 0.5s;
    }

    &--ready {
      background: #2563eb;
      animation: status-blink 2s ease-in-out infinite 1s;
    }
  }

  // Panel de control COMO HERO
  &__control-panel {
    position: absolute;
    bottom: -40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 4px;
    padding: 8px 16px;
    background:
      linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%);
    border-radius: 20px;
    border: 1px solid rgba(148, 163, 184, 0.3);
    backdrop-filter: blur(10px);
  }

  &__control-line {
    width: 20px;
    height: 3px;
    background: linear-gradient(90deg, #2563eb, #f59e0b);
    border-radius: 2px;
    animation: control-pulse 2s ease-in-out infinite;

    &:nth-child(2) {
      animation-delay: 0.3s;
    }

    &:nth-child(3) {
      animation-delay: 0.6s;
    }
  }
}

// ===== ANIMACIONES ÉPICAS COMO HERO =====

@keyframes float-particle {
  0%, 100% {
    opacity: 0;
    transform: translateY(100vh) scale(0);
  }
  10%, 90% {
    opacity: 0.7;
  }
  50% {
    transform: translateY(-10vh) scale(1);
    opacity: 1;
  }
}

@keyframes grid-move {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(30px, 30px);
  }
}

@keyframes spark {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  50% {
    opacity: 0.8;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

@keyframes slide-in-left {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slide-in-right {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes gradient-shift {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes glow-pulse {
  from {
    text-shadow: 0 0 15px rgba(245, 158, 11, 0.5);
  }
  to {
    text-shadow: 0 0 25px rgba(245, 158, 11, 0.8), 0 0 35px rgba(245, 158, 11, 0.3);
  }
}

@keyframes expand-line {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes spark-orbit {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) translateY(-40px) scale(0);
  }
}

@keyframes cursor-blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes laser-scan {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
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

@keyframes ring-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes icon-spark-fly {
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
    transform: translate(-50%, -50%) translateY(-25px) scale(0);
  }
}

@keyframes profile-energy {
  0%, 100% {
    background-size: 100% 100%, 200% 200%;
    transform: scale(1);
  }
  50% {
    background-size: 100% 100%, 300% 300%;
    transform: scale(1.02);
  }
}

@keyframes shimmer-rotate {
  0% {
    transform: rotate(0deg);
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: rotate(360deg);
    opacity: 0;
  }
}

@keyframes icon-float {
  0%, 100% {
    transform: translateY(0px) rotateZ(0deg);
  }
  25% {
    transform: translateY(-8px) rotateZ(2deg);
  }
  75% {
    transform: translateY(-4px) rotateZ(-2deg);
  }
}

@keyframes energy-wave {
  0%, 100% {
    transform: scale(1);
    opacity: 0.2;
  }
  50% {
    transform: scale(1.3);
    opacity: 0.5;
  }
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

@keyframes orbital-rotation {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes particle-orbit {
  0%, 100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes status-blink {
  0%, 70%, 100% {
    opacity: 0.3;
  }
  35% {
    opacity: 1;
  }
}

@keyframes control-pulse {
  0%, 100% {
    opacity: 0.5;
    background: linear-gradient(90deg, #475569, #64748b);
  }
  50% {
    opacity: 1;
    background: linear-gradient(90deg, #2563eb, #f59e0b);
  }
}

// ===== RESPONSIVE OPTIMIZATIONS =====

@media (max-width: 767px) {
  .about {
    &__title-line {
      font-size: 1.75rem;
    }

    &__title-highlight {
      font-size: 2rem;
    }

    &__highlight-card {
      padding: 1.5rem;

      &:hover {
        transform: translateY(-4px) scale(1.01);
      }
    }

    &__highlight-icon {
      font-size: 2rem;
      width: 3rem;
      height: 3rem;
    }

    &__profile-container {
      width: 150px;
      height: 150px;
    }

    &__profile-placeholder {
      width: 100px;
      height: 100px;
      font-size: 2rem;
    }

    // Reducir complejidad de animaciones en móvil
    &__particle {
      animation-duration: 4s !important;
    }

    &__spark {
      animation-duration: 1s !important;
    }
  }
}

@media (max-width: 320px) {
  .about {
    &__title-line {
      font-size: 1.5rem;
    }

    &__title-highlight {
      font-size: 1.75rem;
    }

    &__highlight-card {
      padding: 1.25rem;
    }

    &__profile-container {
      width: 140px;
      height: 140px;
    }

    &__profile-placeholder {
      width: 90px;
      height: 90px;
      font-size: 1.75rem;
    }
  }
}

// Modo de ahorro de batería
@media (prefers-reduced-motion: reduce) {
  .about {
    &__particle,
    &__spark,
    &__rotating-ring,
    &__orbital-particles,
    &__profile-energy {
      animation: none !important;
    }

    &__title-highlight {
      animation: none !important;
      background: #f59e0b;
      -webkit-background-clip: initial;
      -webkit-text-fill-color: initial;
      background-clip: initial;
      color: #f59e0b;
    }

    &__industrial-grid {
      animation: none !important;
    }
  }
}
</style>
