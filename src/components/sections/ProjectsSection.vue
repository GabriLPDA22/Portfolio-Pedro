<!-- src/components/sections/ProjectsSection.vue -->
<template>
  <section id="projects" class="projects section-padding">
    <div class="container">
      <h3 class="section-title">Proyectos Destacados</h3>
      <div class="projects__grid">
        <div
          v-for="(project, index) in projectsData"
          :key="project.id"
          class="projects__card"
          :style="{ animationDelay: `${index * 0.2}s` }"
        >
          <div class="projects__image">
            <div class="projects__placeholder">
              <span class="projects__icon">{{ project.icon }}</span>
            </div>
            <div class="projects__overlay">
              <button class="projects__view-btn" @click="openProjectModal(project)">
                Ver Detalles
              </button>
            </div>
          </div>

          <div class="projects__content">
            <h4 class="projects__title">{{ project.title }}</h4>
            <p class="projects__description">{{ project.description }}</p>

            <div class="projects__tech">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="projects__tech-tag"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para ver detalles del proyecto -->
    <div v-if="selectedProject" class="projects__modal" @click="closeModal">
      <div class="projects__modal-content" @click.stop>
        <button class="projects__modal-close" @click="closeModal">&times;</button>
        <div class="projects__modal-header">
          <span class="projects__modal-icon">{{ selectedProject.icon }}</span>
          <h3>{{ selectedProject.title }}</h3>
        </div>
        <div class="projects__modal-body">
          <p>{{ selectedProject.description }}</p>
          <div class="projects__modal-tech">
            <h4>Tecnologías utilizadas:</h4>
            <div class="projects__tech">
              <span
                v-for="tech in selectedProject.technologies"
                :key="tech"
                class="projects__tech-tag"
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
      document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
      selectedProject.value = null
      document.body.style.overflow = ''
    }

    return {
      selectedProject,
      openProjectModal,
      closeModal
    }
  }
}
</script>

<style lang="scss" scoped>
.projects {
  background: $bg-white;

  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;

    @include md {
      grid-template-columns: repeat(2, 1fr);
    }

    @include lg {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  &__card {
    background: $bg-white;
    border-radius: $radius-lg;
    overflow: hidden;
    box-shadow: $shadow-md;
    transition: all $transition-base;
    animation: fadeInUp 0.8s ease-out both;
    border: 1px solid transparent;

    &:hover {
      transform: translateY(-10px);
      box-shadow: $shadow-xl;
      border-color: $primary-color;

      .projects__overlay {
        opacity: 1;
      }

      .projects__placeholder {
        transform: scale(1.05);
      }
    }
  }

  &__image {
    height: 200px;
    position: relative;
    overflow: hidden;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    background: $gradient-primary;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform $transition-base;
  }

  &__icon {
    font-size: 4rem;
    filter: brightness(0) invert(1);
  }

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($bg-dark, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity $transition-base;
  }

  &__view-btn {
    background: $accent-color;
    color: $text-white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: $radius-md;
    font-weight: $font-semibold;
    cursor: pointer;
    transition: all $transition-base;

    &:hover {
      background: $accent-dark;
      transform: scale(1.05);
    }
  }

  &__content {
    padding: 1.5rem;
  }

  &__title {
    font-size: $font-xl;
    font-weight: $font-semibold;
    margin-bottom: 0.75rem;
    color: $text-primary;
  }

  &__description {
    color: $text-secondary;
    margin-bottom: 1rem;
    line-height: 1.6;
  }

  &__tech {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__tech-tag {
    background: $bg-light;
    color: $primary-color;
    padding: 0.25rem 0.75rem;
    border-radius: $radius-xl;
    font-size: $font-xs;
    font-weight: $font-medium;
    border: 1px solid $primary-color;
    transition: all $transition-base;

    &:hover {
      background: $primary-color;
      color: $text-white;
    }
  }

  // Modal styles
  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba($bg-dark, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: $z-modal;
    padding: 1rem;
    animation: fadeIn 0.3s ease-out;
  }

  &__modal-content {
    background: $bg-white;
    border-radius: $radius-lg;
    max-width: 600px;
    width: 100%;
    max-height: 80vh;
    overflow-y: auto;
    position: relative;
    animation: slideUp 0.3s ease-out;
  }

  &__modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: $text-secondary;
    transition: color $transition-base;
    z-index: 1;

    &:hover {
      color: $text-primary;
    }
  }

  &__modal-header {
    padding: 2rem;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    gap: 1rem;

    h3 {
      margin: 0;
      color: $text-primary;
    }
  }

  &__modal-icon {
    font-size: 3rem;
  }

  &__modal-body {
    padding: 2rem;

    p {
      margin-bottom: 1.5rem;
      line-height: 1.7;
      color: $text-secondary;
    }

    h4 {
      margin-bottom: 1rem;
      color: $text-primary;
    }
  }

  &__modal-tech {
    .projects__tech {
      margin-top: 0.5rem;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(30px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// Responsive
@media (max-width: 767px) {
  .projects {
    &__card {
      margin-bottom: 1rem;
    }

    &__content {
      padding: 1rem;
    }

    &__title {
      font-size: $font-lg;
    }

    &__modal-content {
      margin: 1rem;
      max-height: 90vh;
    }

    &__modal-header,
    &__modal-body {
      padding: 1.5rem;
    }

    &__modal-icon {
      font-size: 2.5rem;
    }
  }
}

// Dark mode
@include dark-mode {
  .projects {
    background: $bg-medium;

    &__card {
      background: $bg-dark;
      color: $text-light;
    }

    &__title {
      color: $text-white;
    }

    &__description {
      color: $text-light;
    }

    &__modal-content {
      background: $bg-dark;
      color: $text-light;
    }

    &__modal-header {
      border-bottom-color: $border-dark;

      h3 {
        color: $text-white;
      }
    }

    &__modal-body {
      p {
        color: $text-light;
      }

      h4 {
        color: $text-white;
      }
    }
  }
}
</style>
