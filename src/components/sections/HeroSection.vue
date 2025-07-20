<!-- src/components/sections/HeroSection.vue - MOBILE FIRST OPTIMIZADO -->
<template>
  <section class="hero">
    <!-- Partículas de fondo -->
    <div class="hero__particles">
      <div v-for="i in particleCount" :key="i" class="hero__particle" :style="getParticleStyle(i)"></div>
    </div>

    <!-- Rejilla industrial de fondo -->
    <div class="hero__grid"></div>

    <!-- Efectos de soldadura -->
    <div class="hero__sparks">
      <div v-for="i in sparkCount" :key="i" class="hero__spark" :style="getSparkStyle(i)"></div>
    </div>

    <div class="hero__content">
      <div class="hero__text">
        <h2 class="hero__title">
          <span class="hero__title-line">Especialista en</span>
          <span class="hero__title-highlight" ref="highlightText">Mecanizado</span>
        </h2>

        <p class="hero__description" ref="description">
          {{ portfolioData.personal.description }}
        </p>

        <div class="hero__actions">
          <button
            class="hero__btn hero__btn--primary"
            @click="scrollToSection('#projects')"
            @mouseenter="playSound('click')"
          >
            <span class="hero__btn-icon">⚡</span>
            <span class="hero__btn-text">Ver Proyectos</span>
            <div class="hero__btn-sparks"></div>
          </button>

          <button
            class="hero__btn hero__btn--secondary"
            @click="scrollToSection('#contact')"
            @mouseenter="playSound('hover')"
          >
            <span class="hero__btn-icon">🔧</span>
            <span class="hero__btn-text">Contactar</span>
            <div class="hero__btn-glow"></div>
          </button>
        </div>
      </div>

      <div class="hero__visual">
        <!-- Engranaje principal con efectos -->
        <div class="hero__gear-container">
          <div class="hero__gear hero__gear--large" @mouseenter="activateGear('large')">
            <div class="hero__gear-inner">
              <div class="hero__gear-teeth"></div>
              <div class="hero__gear-center"></div>
              <div class="hero__gear-glow"></div>
            </div>
          </div>

          <div class="hero__gear hero__gear--medium" @mouseenter="activateGear('medium')">
            <div class="hero__gear-inner">
              <div class="hero__gear-teeth"></div>
              <div class="hero__gear-center"></div>
              <div class="hero__gear-glow"></div>
            </div>
          </div>

          <div class="hero__gear hero__gear--small" @mouseenter="activateGear('small')">
            <div class="hero__gear-inner">
              <div class="hero__gear-teeth"></div>
              <div class="hero__gear-center"></div>
              <div class="hero__gear-glow"></div>
            </div>
          </div>
        </div>

        <!-- Efectos adicionales (solo desktop) -->
        <div class="hero__machine-arms">
          <div class="hero__arm hero__arm--1"></div>
          <div class="hero__arm hero__arm--2"></div>
        </div>
      </div>
    </div>

    <!-- Indicador de scroll animado -->
    <div class="hero__scroll-indicator" @click="scrollToSection('#about')">
      <div class="hero__scroll-wheel">
        <div class="hero__scroll-arrow">↓</div>
      </div>
      <span class="hero__scroll-text">Descubre más</span>
    </div>
  </section>
</template>

<script>
import { ref, onMounted, nextTick, computed } from 'vue'

export default {
  name: 'HeroSection',
  props: {
    portfolioData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const highlightText = ref(null)
    const description = ref(null)

    // Responsive particle counts
    const particleCount = computed(() => {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 20 : 50
      }
      return 50
    })

    const sparkCount = computed(() => {
      if (typeof window !== 'undefined') {
        return window.innerWidth < 768 ? 8 : 15
      }
      return 15
    })

    // Efectos de sonido simples (opcional)
    const playSound = (type) => {
      // Simular sonido con vibración si está disponible
      if (navigator.vibrate) {
        if (type === 'click') navigator.vibrate(50)
        if (type === 'hover') navigator.vibrate(20)
      }
    }

    const activateGear = (size) => {
      playSound('hover')
    }

    const scrollToSection = (selector) => {
      playSound('click')
      const element = document.querySelector(selector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }

    const getParticleStyle = (index) => {
      const delay = Math.random() * 5
      const duration = 3 + Math.random() * 4
      const left = Math.random() * 100
      const size = Math.random() * 3 + 1 // Más pequeñas en móvil

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
      const duration = 0.5 + Math.random() * 1
      const left = 20 + Math.random() * 60
      const top = 20 + Math.random() * 60

      return {
        left: `${left}%`,
        top: `${top}%`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`
      }
    }

    const animateText = () => {
      // Efecto de escritura para el texto destacado
      if (highlightText.value) {
        const text = highlightText.value.textContent
        highlightText.value.textContent = ''

        for (let i = 0; i < text.length; i++) {
          setTimeout(() => {
            highlightText.value.textContent += text[i]
          }, i * 100)
        }
      }
    }

    onMounted(() => {
      nextTick(() => {
        setTimeout(animateText, 1000)
      })
    })

    return {
      highlightText,
      description,
      particleCount,
      sparkCount,
      playSound,
      activateGear,
      scrollToSection,
      getParticleStyle,
      getSparkStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  padding: 6rem 1rem 4rem; // Mobile first padding
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 48, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);

  // Tablet padding
  @media (min-width: 768px) {
    padding: 8rem 2rem 4rem;
  }

  // Desktop padding
  @media (min-width: 1024px) {
    padding: 8rem 3rem 4rem;
  }

  // Partículas flotantes
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

  // Rejilla industrial - más sutil en móvil
  &__grid {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image:
      linear-gradient(rgba(245, 158, 11, 0.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(245, 158, 11, 0.05) 1px, transparent 1px);
    background-size: 30px 30px; // Más pequeña en móvil
    animation: grid-move 20s linear infinite;
    z-index: 1;

    @media (min-width: 768px) {
      background-image:
        linear-gradient(rgba(245, 158, 11, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(245, 158, 11, 0.1) 1px, transparent 1px);
      background-size: 50px 50px;
    }
  }

  // Chispas de soldadura
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

  &__content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;
    width: 100%;
    z-index: 10;
    position: relative;

    // Tablet layout
    @media (min-width: 768px) {
      gap: 3rem;
    }

    // Desktop layout
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

    @media (min-width: 968px) {
      text-align: left;
    }
  }

  &__title {
    font-size: 2rem; // Mobile first
    font-weight: 900;
    margin-bottom: 1.5rem;
    line-height: 1.1;

    @media (min-width: 480px) {
      font-size: 2.5rem;
    }

    @media (min-width: 768px) {
      font-size: 3.5rem;
      margin-bottom: 2rem;
    }

    @media (min-width: 1024px) {
      font-size: 4.5rem;
    }

    @media (min-width: 1200px) {
      font-size: 5.5rem;
    }
  }

  &__title-line {
    display: block;
    color: #e2e8f0;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    animation: slide-in-left 1s ease-out;

    @media (min-width: 768px) {
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

  &__description {
    font-size: 1rem; // Mobile first
    color: #cbd5e1;
    margin-bottom: 2rem;
    line-height: 1.6;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    animation: fade-in-up 1s ease-out 0.5s both;
    max-width: 90%;
    margin-left: auto;
    margin-right: auto;

    @media (min-width: 480px) {
      font-size: 1.125rem;
      line-height: 1.7;
    }

    @media (min-width: 768px) {
      font-size: 1.25rem;
      margin-bottom: 3rem;
      max-width: 100%;
    }

    @media (min-width: 968px) {
      margin-left: 0;
      margin-right: 0;
    }

    @media (min-width: 1024px) {
      font-size: 1.375rem;
    }
  }

  &__actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    align-items: center;
    width: 100%;

    @media (min-width: 480px) {
      flex-direction: row;
      justify-content: center;
      gap: 1.5rem;
    }

    @media (min-width: 968px) {
      justify-content: flex-start;
    }
  }

  // Botones épicos - Mobile First
  &__btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.875rem 1.5rem; // Mobile first
    border: none;
    border-radius: 0.5rem;
    font-size: 0.95rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    backdrop-filter: blur(10px);
    width: 100%;
    max-width: 200px;

    @media (min-width: 480px) {
      width: auto;
      max-width: none;
      padding: 1rem 2rem;
      gap: 0.75rem;
      font-size: 1rem;
    }

    @media (min-width: 768px) {
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
      border-radius: 0.75rem;
    }

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    &:hover::before {
      left: 100%;
    }

    &--primary {
      background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      box-shadow:
        0 4px 15px rgba(37, 99, 235, 0.4),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);

      @media (min-width: 768px) {
        box-shadow:
          0 8px 25px rgba(37, 99, 235, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);
      }

      &:hover {
        transform: translateY(-2px) scale(1.02);
        box-shadow:
          0 8px 25px rgba(37, 99, 235, 0.6),
          inset 0 1px 0 rgba(255, 255, 255, 0.3);

        @media (min-width: 768px) {
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 12px 35px rgba(37, 99, 235, 0.6),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
        }
      }

      &:active {
        transform: translateY(-1px) scale(0.98);
      }
    }

    &--secondary {
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%);
      color: #f59e0b;
      border: 2px solid #f59e0b;
      box-shadow:
        0 4px 15px rgba(245, 158, 11, 0.2),
        inset 0 1px 0 rgba(245, 158, 11, 0.1);

      @media (min-width: 768px) {
        box-shadow:
          0 8px 25px rgba(245, 158, 11, 0.2),
          inset 0 1px 0 rgba(245, 158, 11, 0.1);
      }

      &:hover {
        background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
        color: #0f172a;
        transform: translateY(-2px) scale(1.02);
        box-shadow:
          0 8px 25px rgba(245, 158, 11, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.2);

        @media (min-width: 768px) {
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 12px 35px rgba(245, 158, 11, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.2);
        }
      }
    }
  }

  &__btn-icon {
    font-size: 1rem;
    animation: bounce 2s infinite;

    @media (min-width: 768px) {
      font-size: 1.25rem;
    }
  }

  &__btn-sparks {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s;

    &::before, &::after {
      content: '';
      position: absolute;
      width: 3px;
      height: 3px;
      background: #fbbf24;
      border-radius: 50%;
      animation: spark-fly 1s ease-out infinite;

      @media (min-width: 768px) {
        width: 4px;
        height: 4px;
      }
    }

    &::before {
      top: 20%;
      left: 10%;
      animation-delay: 0s;
    }

    &::after {
      top: 60%;
      right: 15%;
      animation-delay: 0.3s;
    }
  }

  &__btn--primary:hover &__btn-sparks {
    opacity: 1;
  }

  // Sección visual - Mobile First
  &__visual {
    position: relative;
    height: 250px; // Mobile first
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (min-width: 480px) {
      height: 300px;
    }

    @media (min-width: 768px) {
      height: 400px;
    }

    @media (min-width: 1024px) {
      height: 500px;
    }
  }

  &__gear-container {
    position: relative;
    width: 100%;
    height: 100%;
    max-width: 400px;
  }

  // Engranajes mejorados - Mobile First
  &__gear {
    position: absolute;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;

    &--large {
      width: 100px; // Mobile first
      height: 100px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      animation: rotate-gear 12s linear infinite;

      @media (min-width: 480px) {
        width: 120px;
        height: 120px;
      }

      @media (min-width: 768px) {
        width: 150px;
        height: 150px;
      }

      @media (min-width: 1024px) {
        width: 180px;
        height: 180px;
      }
    }

    &--medium {
      width: 70px; // Mobile first
      height: 70px;
      top: 15%;
      right: 10%;
      animation: rotate-gear 8s linear infinite reverse;

      @media (min-width: 480px) {
        width: 80px;
        height: 80px;
      }

      @media (min-width: 768px) {
        width: 100px;
        height: 100px;
      }

      @media (min-width: 1024px) {
        width: 120px;
        height: 120px;
      }
    }

    &--small {
      width: 50px; // Mobile first
      height: 50px;
      bottom: 20%;
      left: 15%;
      animation: rotate-gear 6s linear infinite;

      @media (min-width: 480px) {
        width: 60px;
        height: 60px;
      }

      @media (min-width: 768px) {
        width: 70px;
        height: 70px;
      }

      @media (min-width: 1024px) {
        width: 80px;
        height: 80px;
      }
    }

    &:hover {
      animation-duration: 2s !important;
      filter: drop-shadow(0 0 15px #f59e0b);

      @media (min-width: 768px) {
        filter: drop-shadow(0 0 20px #f59e0b);
      }
    }
  }

  &__gear-inner {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background:
      radial-gradient(circle at 30% 30%, #64748b 0%, #334155 70%),
      conic-gradient(from 0deg, #475569, #64748b, #475569);
    box-shadow:
      inset 0 0 15px rgba(0, 0, 0, 0.3),
      0 0 20px rgba(100, 116, 139, 0.3);

    @media (min-width: 768px) {
      box-shadow:
        inset 0 0 20px rgba(0, 0, 0, 0.3),
        0 0 30px rgba(100, 116, 139, 0.3);
    }
  }

  &__gear-teeth {
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border-radius: 50%;
    background: conic-gradient(
      from 0deg,
      #f59e0b 0deg 15deg,
      transparent 15deg 30deg,
      #f59e0b 30deg 45deg,
      transparent 45deg 60deg,
      #f59e0b 60deg 75deg,
      transparent 75deg 90deg,
      #f59e0b 90deg 105deg,
      transparent 105deg 120deg,
      #f59e0b 120deg 135deg,
      transparent 135deg 150deg,
      #f59e0b 150deg 165deg,
      transparent 165deg 180deg,
      #f59e0b 180deg 195deg,
      transparent 195deg 210deg,
      #f59e0b 210deg 225deg,
      transparent 225deg 240deg,
      #f59e0b 240deg 255deg,
      transparent 255deg 270deg,
      #f59e0b 270deg 285deg,
      transparent 285deg 300deg,
      #f59e0b 300deg 315deg,
      transparent 315deg 330deg,
      #f59e0b 330deg 345deg,
      transparent 345deg 360deg
    );

    @media (min-width: 768px) {
      top: -8px;
      left: -8px;
      right: -8px;
      bottom: -8px;
    }
  }

  &__gear-center {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 30%;
    height: 30%;
    background:
      radial-gradient(circle, #1e293b 0%, #0f172a 100%);
    border-radius: 50%;
    box-shadow:
      inset 0 0 8px rgba(0, 0, 0, 0.5),
      0 0 15px rgba(245, 158, 11, 0.3);

    @media (min-width: 768px) {
      box-shadow:
        inset 0 0 10px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(245, 158, 11, 0.3);
    }
  }

  &__gear-glow {
    position: absolute;
    top: -15px;
    left: -15px;
    right: -15px;
    bottom: -15px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(245, 158, 11, 0.1) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s;

    @media (min-width: 768px) {
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
    }
  }

  &__gear:hover &__gear-glow {
    opacity: 1;
    animation: pulse-glow 1s ease-in-out infinite alternate;
  }

  // Brazos mecánicos - Solo desktop
  &__machine-arms {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    display: none;

    @media (min-width: 1024px) {
      display: block;
    }
  }

  &__arm {
    position: absolute;
    background: linear-gradient(90deg, #64748b, #94a3b8);
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

    &--1 {
      width: 120px;
      height: 8px;
      top: 30%;
      left: 20%;
      transform: rotate(25deg);
      animation: arm-move-1 4s ease-in-out infinite alternate;
    }

    &--2 {
      width: 100px;
      height: 6px;
      bottom: 35%;
      right: 25%;
      transform: rotate(-35deg);
      animation: arm-move-2 3s ease-in-out infinite alternate;
    }
  }

  // Indicador de scroll - Mobile First
  &__scroll-indicator {
    position: absolute;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;
    z-index: 10;

    @media (min-width: 768px) {
      bottom: 2rem;
      gap: 0.5rem;
    }

    &:hover {
      transform: translateX(-50%) translateY(-3px);

      @media (min-width: 768px) {
        transform: translateX(-50%) translateY(-5px);
      }
    }
  }

  &__scroll-wheel {
    width: 20px;
    height: 32px;
    border: 2px solid #f59e0b;
    border-radius: 10px;
    position: relative;
    background: rgba(245, 158, 11, 0.1);

    @media (min-width: 768px) {
      width: 24px;
      height: 40px;
      border-radius: 12px;
    }
  }

  &__scroll-arrow {
    position: absolute;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    color: #f59e0b;
    animation: scroll-bounce 2s ease-in-out infinite;
    font-size: 0.75rem;

    @media (min-width: 768px) {
      top: 8px;
      font-size: 1rem;
    }
  }

  &__scroll-text {
    color: #cbd5e1;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }
}

// Animaciones optimizadas para móvil
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

@media (min-width: 768px) {
  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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

@media (min-width: 768px) {
  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (min-width: 768px) {
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

@media (min-width: 768px) {
  @keyframes glow-pulse {
    from {
      text-shadow: 0 0 20px rgba(245, 158, 11, 0.5);
    }
    to {
      text-shadow: 0 0 30px rgba(245, 158, 11, 0.8), 0 0 40px rgba(245, 158, 11, 0.3);
    }
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

@media (min-width: 768px) {
  @keyframes float-particle {
    0%, 100% {
      opacity: 0;
      transform: translateY(100vh) scale(0);
    }
    10%, 90% {
      opacity: 1;
    }
    50% {
      transform: translateY(-10vh) scale(1);
      opacity: 1;
    }
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

@media (min-width: 768px) {
  @keyframes grid-move {
    from {
      transform: translate(0, 0);
    }
    to {
      transform: translate(50px, 50px);
    }
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

@media (min-width: 768px) {
  @keyframes spark {
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
}

@keyframes rotate-gear {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes pulse-glow {
  from {
    opacity: 0.3;
  }
  to {
    opacity: 0.7;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-2px);
  }
  60% {
    transform: translateY(-1px);
  }
}

@media (min-width: 768px) {
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-3px);
    }
    60% {
      transform: translateY(-2px);
    }
  }
}

@keyframes spark-fly {
  0% {
    opacity: 1;
    transform: translate(0, 0) scale(0);
  }
  50% {
    opacity: 1;
    transform: translate(8px, -8px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(15px, -15px) scale(0);
  }
}

@media (min-width: 768px) {
  @keyframes spark-fly {
    0% {
      opacity: 1;
      transform: translate(0, 0) scale(0);
    }
    50% {
      opacity: 1;
      transform: translate(10px, -10px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(20px, -20px) scale(0);
    }
  }
}

@keyframes arm-move-1 {
  from {
    transform: rotate(25deg);
  }
  to {
    transform: rotate(35deg);
  }
}

@keyframes arm-move-2 {
  from {
    transform: rotate(-35deg);
  }
  to {
    transform: rotate(-25deg);
  }
}

@keyframes scroll-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  40% {
    transform: translateX(-50%) translateY(3px);
  }
  60% {
    transform: translateX(-50%) translateY(2px);
  }
}

@media (min-width: 768px) {
  @keyframes scroll-bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateX(-50%) translateY(0);
    }
    40% {
      transform: translateX(-50%) translateY(5px);
    }
    60% {
      transform: translateX(-50%) translateY(3px);
    }
  }
}

// Optimizaciones de rendimiento para móvil
@media (max-width: 767px) {
  // Reducir complejidad de animaciones en móvil
  .hero {
    &__particle {
      animation-duration: 4s !important;
    }

    &__spark {
      animation-duration: 1s !important;
    }

    &__gear {
      animation-duration: 15s !important;

      &:hover {
        animation-duration: 8s !important;
      }
    }
  }
}

// Modo de ahorro de batería
@media (prefers-reduced-motion: reduce) {
  .hero {
    &__particle,
    &__spark,
    &__gear,
    &__arm {
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

    &__grid {
      animation: none !important;
    }
  }
}

// Mejoras para pantallas muy pequeñas
@media (max-width: 320px) {
  .hero {
    padding: 5rem 0.75rem 3rem;

    &__title {
      font-size: 1.75rem;
      margin-bottom: 1rem;
    }

    &__description {
      font-size: 0.95rem;
      margin-bottom: 1.5rem;
    }

    &__btn {
      padding: 0.75rem 1.25rem;
      font-size: 0.875rem;
    }

    &__visual {
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
      }

      &--small {
        width: 40px;
        height: 40px;
      }
    }
  }
}
</style>
