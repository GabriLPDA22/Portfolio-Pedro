<template>
  <section id="contact" class="contact section-padding">
    <div class="container">
      <div class="contact__header">
        <h3 class="section-title">Contacto</h3>
        <p class="contact__subtitle">
          ¿Listo para trabajar juntos? Ponte en contacto conmigo.
        </p>
      </div>

      <div class="contact__grid">
        <div
          v-for="(item, index) in contactItems"
          :key="item.type"
          class="contact__card"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <div class="contact__card-icon">
            <component :is="item.iconComponent" class="contact__icon" />
          </div>

          <div class="contact__card-content">
            <h4 class="contact__card-title">{{ item.label }}</h4>
            <div class="contact__card-value">
              <a v-if="item.link" :href="item.link" target="_blank" rel="noopener">
                {{ item.value }}
              </a>
              <span v-else>{{ item.value }}</span>
            </div>
            <p v-if="item.description" class="contact__card-description">
              {{ item.description }}
            </p>
          </div>

          <div class="contact__card-action" v-if="item.actionText">
            <button class="contact__action-btn" @click="handleContactAction(item)">
              {{ item.actionText }}
              <ArrowRight class="contact__btn-arrow" />
            </button>
          </div>
        </div>
      </div>

      <div class="contact__cta">
        <div class="contact__cta-card">
          <div class="contact__cta-content">
            <h4>¿Tienes un proyecto en mente?</h4>
            <p>Hablemos sobre cómo puedo ayudarte con tu próximo desafío de mecanizado.</p>
          </div>
          <div class="contact__cta-actions">
            <a :href="`mailto:${contactData.email}`" class="contact__cta-btn contact__cta-btn--primary">
              <Mail class="contact__cta-icon" />
              <span>Enviar Email</span>
            </a>
            <a :href="contactData.linkedin" target="_blank" rel="noopener noreferrer" class="contact__cta-btn contact__cta-btn--secondary">
              <Linkedin class="contact__cta-icon" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <div class="contact__professional">
        <div class="contact__professional-content">
          <div class="contact__availability">
            <div class="contact__availability-indicator"></div>
            <span>Disponible para nuevos proyectos</span>
          </div>
          <div class="contact__response-time">
            <Clock class="contact__clock-icon" />
            <span>Tiempo de respuesta: 24-48 horas</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from 'vue'
import { Mail, Phone, MapPin, Linkedin, Clock, ArrowRight } from 'lucide-vue-next'

export default {
  name: 'ContactSection',
  components: {
    Mail, Phone, MapPin, Linkedin, Clock, ArrowRight
  },
  props: {
    contactData: {
      type: Object,
      required: true
    },
    personalData: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const contactItems = computed(() => [
      {
        type: 'email',
        iconComponent: Mail,
        label: 'Email',
        value: props.contactData.email,
        link: `mailto:${props.contactData.email}`,
        description: 'Perfecto para consultas detalladas.',
        actionText: 'Enviar Email'
      },
      {
        type: 'phone',
        iconComponent: Phone,
        label: 'Teléfono',
        value: props.contactData.phone,
        description: 'Disponible en horario laboral.'
      },
      {
        type: 'location',
        iconComponent: MapPin,
        label: 'Ubicación',
        value: props.contactData.address || props.personalData.location,
        description: 'Disponible para proyectos locales.'
      },
      {
        type: 'linkedin',
        iconComponent: Linkedin,
        label: 'LinkedIn',
        value: 'Conectemos profesionalmente',
        link: props.contactData.linkedin,
        description: 'Visita mi perfil para ver más detalles.',
        actionText: 'Ver Perfil'
      }
    ])

    const handleContactAction = (item) => {
      if (item.link) {
        window.open(item.link, item.type === 'linkedin' ? '_blank' : '_self')
      }
    }

    return {
      contactItems,
      handleContactAction
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
@import '@/assets/styles/mixins.scss';

.contact {
  background: #0f172a;

  &__header {
    text-align: center;
    margin-bottom: 4rem;
  }

  .section-title {
    font-size: clamp(2.25rem, 5vw, 3rem); // Tipografía Fluida
    font-weight: 700;
    text-align: center;
    margin-bottom: 2.5rem;
    position: relative;
    color: $accent-color;

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
      height: 3px;
      background: $accent-color;
      border-radius: 2px;
    }
  }

  &__subtitle {
    font-size: 1.125rem;
    color: $text-light;
    margin-top: 1rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  &__grid {
    display: grid;
    gap: 2rem;
    margin-bottom: 4rem;

    @media (min-width: 640px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media (min-width: 1024px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__card {
    background: rgba(248, 250, 252, 0.05);
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(248, 250, 252, 0.1);
    transition: all 0.35s ease;
    animation: fade-in-up 0.6s ease both;
    backdrop-filter: blur(12px);
    display: flex; // Usamos Flexbox
    flex-direction: column; // En columna
    text-align: left; // Alineamos el texto a la izquierda

    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
      border-color: $accent-color;

      .contact__action-btn .contact__btn-arrow {
        transform: translateX(4px);
      }
    }
  }

  &__card-icon {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__icon {
    color: $accent-color;
    width: 2.5rem;
    height: 2.5rem;
  }

  &__card-content {
    flex-grow: 1; // Hace que esta sección ocupe el espacio disponible
    margin-bottom: 1.5rem;
  }

  &__card-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: $text-white;
    margin-bottom: 0.5rem;
  }

  &__card-value {
    margin-bottom: 1rem;
    a, span {
      font-size: 1rem;
      color: $text-light;
      text-decoration: none;
      font-weight: 400;
      transition: color 0.3s ease;
      word-break: break-all;
    }
    a:hover {
      color: $accent-color;
    }
  }

  &__card-description {
    font-size: 0.875rem;
    color: rgba($text-light, 0.7);
    margin: 0;
    line-height: 1.6;
  }

  &__action-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    background: transparent;
    color: $accent-color;
    border: 1px solid $accent-color;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: $accent-color;
      color: #0f172a;
    }
  }

  &__btn-arrow {
    width: 1rem;
    height: 1rem;
    transition: transform 0.3s ease;
  }

  &__cta {
    margin: 4rem 0;
  }

  &__cta-card {
    background: rgba(248, 250, 252, 0.05);
    border-radius: 1.5rem;
    padding: 2rem;
    text-align: center;
    border: 1px solid rgba(248, 250, 252, 0.1);
    backdrop-filter: blur(15px);

    @media (min-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      padding: 3rem;
    }
  }

  &__cta-content {
    margin-bottom: 2rem;
    @media (min-width: 768px) {
      margin-bottom: 0;
      flex: 1;
      margin-right: 2rem;
    }
    h4 {
      font-size: clamp(1.25rem, 4vw, 1.75rem);
      font-weight: 700;
      color: $text-white;
      margin-bottom: 0.75rem;
    }
    p {
      font-size: 1rem;
      color: $text-light;
      margin: 0;
      line-height: 1.6;
      max-width: 500px;
    }
  }

  &__cta-actions {
    display: flex;
    gap: 1rem;
    flex-direction: column;
    @media (min-width: 480px) {
      flex-direction: row;
      justify-content: center;
    }
    @media (min-width: 768px) {
      justify-content: flex-end;
    }
  }

  &__cta-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 0.875rem 1.5rem;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 1rem;
    text-decoration: none;
    transition: all 0.3s ease;
    border: 1px solid transparent;

    &--primary {
      background: $accent-color;
      color: #0f172a;
      &:hover {
        background: lighten($accent-color, 5%);
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba($accent-color, 0.3);
      }
    }
    &--secondary {
      background: rgba(248, 250, 252, 0.1);
      color: $text-white;
      border-color: rgba(248, 250, 252, 0.2);
      &:hover {
        background: rgba(248, 250, 252, 0.15);
        border-color: rgba(248, 250, 252, 0.3);
        transform: translateY(-3px);
      }
    }
  }

  &__cta-icon, &__clock-icon {
    width: 1.25rem;
    height: 1.25rem;
  }

  &__professional-content {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem 2rem;
    flex-wrap: wrap;
    padding-top: 2rem;
    border-top: 1px solid rgba(248, 250, 252, 0.1);
  }

  &__availability, &__response-time {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: $text-light;
    font-size: 0.875rem;
  }

  &__availability-indicator {
    width: 10px;
    height: 10px;
    background: #10b981;
    border-radius: 50%;
    animation: pulse-indicator 2s infinite;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.7);
  }
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-indicator {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.7; }
}
</style>
