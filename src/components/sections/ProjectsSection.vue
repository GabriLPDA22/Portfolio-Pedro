<!-- src/components/sections/ProjectsSection.vue -->
<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <!-- Header -->
      <div class="projects__header">
        <h3 class="section-title">Proyectos Destacados</h3>
        <p class="projects__subtitle">
          Casos de éxito en mecanizado de precisión
        </p>
      </div>

      <!-- Grid de proyectos -->
      <div class="projects__grid">
        <div
          v-for="(project, index) in projectsData"
          :key="project.id"
          class="projects__card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <!-- Badge de estado -->
          <div class="projects__badge">COMPLETADO</div>

          <!-- Icon -->
          <div class="projects__icon">{{ project.icon }}</div>

          <!-- Contenido -->
          <div class="projects__content">
            <h4 class="projects__title">{{ project.title }}</h4>
            <p class="projects__description">{{ project.description }}</p>

            <!-- Tecnologías -->
            <div class="projects__technologies">
              <span class="projects__tech-label">TECNOLOGÍAS:</span>
              <div class="projects__tech-list">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="projects__tech-tag"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <!-- Métricas -->
            <div class="projects__metrics">
              <div class="projects__metric" v-for="metric in getProjectMetrics(project)" :key="metric.label">
                <div class="projects__metric-value">{{ metric.value }}</div>
                <div class="projects__metric-label">{{ metric.label }}</div>
              </div>
            </div>

            <!-- Botón Ver detalles -->
            <button class="projects__details-btn" @click="openProjectModal(project)">
              <span>Ver detalles</span>
              <span class="projects__btn-arrow">→</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal de detalles -->
      <div v-if="selectedProject" class="projects__modal" @click="closeModal">
        <div class="projects__modal-content" @click.stop>
          <div class="projects__modal-header">
            <div class="projects__modal-title-section">
              <span class="projects__modal-icon">{{ selectedProject.icon }}</span>
              <div>
                <h3 class="projects__modal-title">{{ selectedProject.title }}</h3>
                <div class="projects__modal-status">PROYECTO COMPLETADO</div>
              </div>
            </div>
            <button class="projects__modal-close" @click="closeModal">✕</button>
          </div>

          <div class="projects__modal-body">
            <div class="projects__modal-section">
              <h4>Descripción del Proyecto</h4>
              <p>{{ selectedProject.description }}</p>
            </div>

            <div class="projects__modal-section">
              <h4>Tecnologías Utilizadas</h4>
              <div class="projects__modal-tech-grid">
                <span
                  v-for="tech in selectedProject.technologies"
                  :key="tech"
                  class="projects__modal-tech-item"
                >
                  {{ tech }}
                </span>
              </div>
            </div>

            <div class="projects__modal-section">
              <h4>Especificaciones Técnicas</h4>
              <div class="projects__modal-specs">
                <div class="projects__spec-item" v-for="spec in getDetailedSpecs(selectedProject)" :key="spec.label">
                  <span class="projects__spec-label">{{ spec.label }}:</span>
                  <span class="projects__spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'ProjectsSection',
  props: {
    projectsData: {
      type: Array,
      required: true
    }
  },
  setup() {
    const selectedProject = ref(null)

    const openProjectModal = (project) => {
      selectedProject.value = project
    }

    const closeModal = () => {
      selectedProject.value = null
    }

    const getProjectMetrics = (project) => {
      const baseMetrics = [
        { label: 'PRECISIÓN', value: '±0.005mm' },
        { label: 'TIEMPO', value: '2-3 sem' }
      ]

      if (project.title.includes('Aeronáutica')) {
        baseMetrics.push({ label: 'CERT.', value: 'AS9100' })
      } else if (project.title.includes('Utillajes')) {
        baseMetrics.push({ label: 'DURABILIDAD', value: '10K+ ciclos' })
      } else if (project.title.includes('Prototipos')) {
        baseMetrics.push({ label: 'COMPLEJIDAD', value: 'ALTA' })
      }

      return baseMetrics
    }

    const getDetailedSpecs = (project) => {
      return [
        { label: 'Tolerancia dimensional', value: '±0.005mm' },
        { label: 'Rugosidad superficial', value: 'Ra 0.8μm' },
        { label: 'Material principal', value: project.technologies[0] || 'Varios' },
        { label: 'Proceso principal', value: project.technologies[1] || 'CNC' },
        { label: 'Control de calidad', value: 'CMM + SPC' },
        { label: 'Certificación', value: 'ISO 9001:2015' }
      ]
    }

    return {
      selectedProject,
      openProjectModal,
      closeModal,
      getProjectMetrics,
      getDetailedSpecs
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.projects {
  background: linear-gradient(135deg,
    #0f172a 0%,
    #1e293b 50%,
    #334155 100%);

  // HEADER
  &__header {
    text-align: center;
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    color: $accent-color;

    @media (min-width: 480px) {
      font-size: 2.25rem;
      margin-bottom: 2.5rem;
    }

    @media (min-width: 768px) {
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    @media (min-width: 1024px) {
      font-size: 3rem;
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 3px;
      background: $accent-color;
      border-radius: 2px;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: rgba(248, 250, 252, 0.7);
    margin-top: 1rem;
  }

  // GRID
  &__grid {
    display: grid;
    gap: 2rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 1024px) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  // CARD
  &__card {
    background: rgba(248, 250, 252, 0.05);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(248, 250, 252, 0.1);
    transition: all 0.3s ease;
    position: relative;
    animation: fade-in-up 0.6s ease both;
    backdrop-filter: blur(10px);

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
      border-color: $accent-color;

      .projects__details-btn {
        background: $accent-color;
        color: #0f172a;

        .projects__btn-arrow {
          transform: translateX(5px);
        }
      }
    }
  }

  &__badge {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    border: 1px solid rgba(16, 185, 129, 0.2);
  }

  &__icon {
    font-size: 3rem;
    text-align: center;
    margin-bottom: 1.5rem;
    display: block;
  }

  &__content {
    text-align: center;
  }

  &__title {
    font-size: 1.25rem;
    font-weight: 700;
    color: #f8fafc;
    margin-bottom: 1rem;
  }

  &__description {
    font-size: 0.95rem;
    color: rgba(248, 250, 252, 0.8);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  // TECNOLOGÍAS
  &__technologies {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  &__tech-label {
    font-size: 0.75rem;
    color: $accent-color;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    display: block;
    margin-bottom: 0.75rem;
  }

  &__tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tech-tag {
    background: rgba(245, 158, 11, 0.1);
    color: $accent-color;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8125rem;
    font-weight: 500;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  // MÉTRICAS
  &__metrics {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    padding: 1rem 0;
    border-top: 1px solid rgba(248, 250, 252, 0.1);
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
    margin-bottom: 1.5rem;
  }

  &__metric {
    text-align: center;
  }

  &__metric-value {
    font-size: 1rem;
    font-weight: 700;
    color: $accent-color;
    margin-bottom: 0.25rem;
  }

  &__metric-label {
    font-size: 0.7rem;
    color: rgba(248, 250, 252, 0.6);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 500;
  }

  // BOTÓN VER DETALLES
  &__details-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background: rgba(245, 158, 11, 0.1);
    color: $accent-color;
    border: 1px solid rgba(245, 158, 11, 0.2);
    padding: 0.75rem 1.5rem;
    border-radius: 0.75rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $accent-color;
      color: #0f172a;
      border-color: $accent-color;
    }
  }

  &__btn-arrow {
    font-size: 1rem;
    transition: transform 0.3s ease;
  }

  // MODAL
  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(15, 23, 42, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    backdrop-filter: blur(8px);
    animation: modal-fade-in 0.3s ease;
  }

  &__modal-content {
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(248, 250, 252, 0.1);
    border-radius: 1rem;
    width: 100%;
    max-width: 600px;
    max-height: 85vh;
    overflow-y: auto;
    animation: modal-slide-up 0.3s ease;
    backdrop-filter: blur(10px);
  }

  &__modal-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__modal-title-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1;
  }

  &__modal-icon {
    font-size: 2.5rem;
  }

  &__modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f8fafc;
    margin: 0 0 0.5rem 0;
  }

  &__modal-status {
    font-size: 0.75rem;
    color: #10b981;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &__modal-close {
    background: rgba(248, 250, 252, 0.05);
    border: 1px solid rgba(248, 250, 252, 0.1);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: rgba(248, 250, 252, 0.7);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(245, 158, 11, 0.2);
      border-color: $accent-color;
      color: $accent-color;
    }
  }

  &__modal-body {
    padding: 2rem;
    padding-top: 1rem;
  }

  &__modal-section {
    margin-bottom: 2rem;

    &:last-child {
      margin-bottom: 0;
    }

    h4 {
      font-size: 1.125rem;
      font-weight: 600;
      color: #f8fafc;
      margin-bottom: 1rem;
    }

    p {
      font-size: 0.95rem;
      color: rgba(248, 250, 252, 0.8);
      line-height: 1.6;
      margin: 0;
    }
  }

  &__modal-tech-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__modal-tech-item {
    background: rgba(245, 158, 11, 0.1);
    color: $accent-color;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  &__modal-specs {
    display: grid;
    gap: 0.75rem;
  }

  &__spec-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
    background: rgba(248, 250, 252, 0.02);
    border-radius: 0.5rem;
    border: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__spec-label {
    font-weight: 500;
    color: rgba(248, 250, 252, 0.7);
  }

  &__spec-value {
    font-weight: 600;
    color: $accent-color;
  }
}

// ANIMACIONES
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

@keyframes modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes modal-slide-up {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
