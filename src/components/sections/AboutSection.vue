<!-- src/components/sections/AboutSection.vue - MOBILE FIRST ÉPICO -->
<template>
  <section id="about" class="about section-padding">
    <div class="container">
      <h3 class="section-title">Sobre Mí</h3>
      <div class="about__content">
        <div class="about__text">
          <p class="about__description">{{ aboutData.description }}</p>
          <div class="about__highlights">
            <div
              v-for="(highlight, index) in aboutData.highlights"
              :key="highlight.title"
              class="about__highlight-card"
              :style="{ animationDelay: `${index * 0.2}s` }"
            >
              <div class="about__highlight-header">
                <div class="about__highlight-icon">{{ highlight.icon }}</div>
                <div class="about__highlight-content">
                  <h4 class="about__highlight-title">{{ highlight.title }}</h4>
                  <span class="about__highlight-year">{{ highlight.year }}</span>
                </div>
              </div>
              <p class="about__highlight-description">{{ highlight.description }}</p>
              <div class="about__highlight-glow"></div>
            </div>
          </div>
        </div>

        <div class="about__image">
          <div class="about__profile">
            <div class="about__profile-placeholder">
              <div class="about__profile-icon">👤</div>
              <div class="about__profile-ring"></div>
              <div class="about__profile-sparks">
                <div v-for="i in 8" :key="i" class="about__spark" :style="getSparkStyle(i)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutSection',
  props: {
    aboutData: {
      type: Object,
      required: true
    }
  },
  setup() {
    const getSparkStyle = (index) => {
      const angle = (index * 45) + 'deg'
      const delay = index * 0.3

      return {
        transform: `rotate(${angle}) translateY(-100px)`,
        animationDelay: `${delay}s`
      }
    }

    return {
      getSparkStyle
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  position: relative;
  overflow: hidden;

  // Patrón de fondo industrial sutil
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image:
      radial-gradient(circle at 25% 25%, rgba(37, 99, 235, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(245, 158, 11, 0.03) 0%, transparent 50%);
    pointer-events: none;
  }

  .container {
    position: relative;
    z-index: 2;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: center;

    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr;
      gap: 3rem;
    }

    @media (min-width: 968px) {
      grid-template-columns: 2fr 1fr;
      gap: 4rem;
      align-items: center;
    }

    @media (min-width: 1200px) {
      gap: 6rem;
    }
  }

  &__text {
    animation: slideInLeft 0.8s ease-out 0.2s both;
    width: 100%;
  }

  &__description {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 2rem;
    color: #475569;
    text-align: center;

    @media (min-width: 480px) {
      font-size: 1.125rem;
      margin-bottom: 2.5rem;
    }

    @media (min-width: 768px) {
      font-size: 1.25rem;
      margin-bottom: 3rem;
      line-height: 1.8;
    }

    @media (min-width: 968px) {
      text-align: left;
    }
  }

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

    // Efecto hover épico
    &:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow:
        0 20px 40px rgba(37, 99, 235, 0.15),
        0 0 0 1px rgba(37, 99, 235, 0.1),
        inset 0 1px 0 rgba(255, 255, 255, 0.3);
      border-color: rgba(37, 99, 235, 0.2);

      .about__highlight-glow {
        opacity: 1;
        transform: scale(1.1);
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

    // Línea de acento lateral
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

  &__highlight-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 1rem;

    @media (min-width: 768px) {
      gap: 1.25rem;
      margin-bottom: 1.25rem;
    }
  }

  &__highlight-icon {
    font-size: 2rem;
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
    border-radius: 50%;
    filter: drop-shadow(0 4px 8px rgba(37, 99, 235, 0.3));
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    flex-shrink: 0;
    position: relative;

    @media (min-width: 480px) {
      font-size: 2.25rem;
      width: 3.5rem;
      height: 3.5rem;
    }

    @media (min-width: 768px) {
      font-size: 2.5rem;
      width: 4rem;
      height: 4rem;
    }

    // Brillo interno
    &::before {
      content: '';
      position: absolute;
      top: 15%;
      left: 15%;
      width: 30%;
      height: 30%;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      filter: blur(2px);
    }

    // Convertir emoji a ícono estilizado
    filter: grayscale(1) brightness(0) invert(1);
  }

  &__highlight-content {
    flex: 1;
    min-width: 0;
  }

  &__highlight-title {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.5rem;
    transition: color 0.3s ease;
    line-height: 1.3;

    @media (min-width: 480px) {
      font-size: 1.25rem;
    }

    @media (min-width: 768px) {
      font-size: 1.375rem;
      margin-bottom: 0.75rem;
    }
  }

  &__highlight-year {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #f59e0b;
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(251, 191, 36, 0.1) 100%);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    border: 1px solid rgba(245, 158, 11, 0.2);
    text-transform: uppercase;
    letter-spacing: 0.5px;

    @media (min-width: 480px) {
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
    }

    @media (min-width: 768px) {
      font-size: 0.875rem;
      padding: 0.375rem 1rem;
    }
  }

  &__highlight-description {
    font-size: 0.9rem;
    color: #64748b;
    line-height: 1.6;
    margin: 0;

    @media (min-width: 480px) {
      font-size: 0.95rem;
    }

    @media (min-width: 768px) {
      font-size: 1rem;
      line-height: 1.7;
    }
  }

  &__highlight-glow {
    position: absolute;
    top: -20px;
    left: -20px;
    right: -20px;
    bottom: -20px;
    background: radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%);
    border-radius: 1.5rem;
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s ease;
    pointer-events: none;
    z-index: -1;

    @media (min-width: 768px) {
      top: -30px;
      left: -30px;
      right: -30px;
      bottom: -30px;
    }
  }

  // Sección de imagen
  &__image {
    display: flex;
    justify-content: center;
    animation: slideInRight 0.8s ease-out 0.4s both;
    order: -1;

    @media (min-width: 968px) {
      order: 0;
    }
  }

  &__profile {
    position: relative;
  }

  &__profile-placeholder {
    width: 180px;
    height: 180px;
    background: linear-gradient(135deg, #2563eb 0%, #f59e0b 50%, #2563eb 100%);
    background-size: 200% 200%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.5rem;
    position: relative;
    overflow: hidden;
    animation: profilePulse 4s ease-in-out infinite;
    box-shadow:
      0 0 0 4px rgba(255, 255, 255, 0.8),
      0 0 0 8px rgba(37, 99, 235, 0.1),
      0 20px 40px rgba(37, 99, 235, 0.2);

    @media (min-width: 480px) {
      width: 200px;
      height: 200px;
      font-size: 4rem;
    }

    @media (min-width: 768px) {
      width: 250px;
      height: 250px;
      font-size: 5rem;
      box-shadow:
        0 0 0 6px rgba(255, 255, 255, 0.9),
        0 0 0 12px rgba(37, 99, 235, 0.1),
        0 25px 50px rgba(37, 99, 235, 0.25);
    }

    // Efecto de shimmer
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      animation: shimmer 3s ease-in-out infinite;
      transform: rotate(45deg);
    }
  }

  &__profile-icon {
    filter: brightness(0) invert(1);
    z-index: 3;
    position: relative;
    animation: iconFloat 6s ease-in-out infinite;
  }

  &__profile-ring {
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
    animation: ringRotate 8s linear infinite;

    @media (min-width: 768px) {
      top: -20px;
      left: -20px;
      right: -20px;
      bottom: -20px;
      border-width: 3px;
    }
  }

  &__profile-sparks {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  &__spark {
    position: absolute;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, #fbbf24 0%, #f59e0b 100%);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform-origin: 0 0;
    animation: sparkFly 2s ease-out infinite;
    opacity: 0;

    @media (min-width: 768px) {
      width: 6px;
      height: 6px;
    }
  }
}

// Animaciones
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (min-width: 768px) {
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (min-width: 768px) {
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
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

@media (min-width: 768px) {
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
}

@keyframes profilePulse {
  0%, 100% {
    background-position: 0% 50%;
    transform: scale(1);
  }
  50% {
    background-position: 100% 50%;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  50% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

@keyframes ringRotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes sparkFly {
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
    transform: translate(-50%, -50%) translateY(-100px) scale(0);
  }
}

// Optimizaciones para móvil
@media (max-width: 767px) {
  .about {
    &__highlight-card:hover {
      transform: translateY(-4px) scale(1.01);
      box-shadow:
        0 10px 20px rgba(37, 99, 235, 0.1),
        0 0 0 1px rgba(37, 99, 235, 0.05);
    }

    &__profile-placeholder {
      animation-duration: 6s;
    }

    &__spark {
      animation-duration: 3s;
    }
  }
}

// Pantallas muy pequeñas
@media (max-width: 320px) {
  .about {
    &__highlight-card {
      padding: 1rem;
    }

    &__highlight-header {
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }

    &__highlight-icon {
      font-size: 1.75rem;
      width: 2.5rem;
      height: 2.5rem;
    }

    &__profile-placeholder {
      width: 150px;
      height: 150px;
      font-size: 3rem;
    }
  }
}

// Modo de ahorro de batería
@media (prefers-reduced-motion: reduce) {
  .about {
    &__highlight-card,
    &__profile-placeholder,
    &__profile-ring,
    &__spark {
      animation: none !important;
    }

    &__profile-placeholder::before {
      animation: none !important;
    }
  }
}
</style>
