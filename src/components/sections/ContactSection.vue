<!-- src/components/sections/ContactSection.vue -->
<template>
  <section id="contact" class="contact section-padding">
    <div class="container">
      <h3 class="section-title">Contacto</h3>
      <div class="contact__content">
        <!-- Información de contacto -->
        <div class="contact__info">
          <div class="contact__item" v-for="(item, index) in contactItems" :key="item.type"
            :style="{ animationDelay: `${index * 0.1}s` }">
            <div class="contact__icon">{{ item.icon }}</div>
            <div class="contact__details">
              <h4>{{ item.label }}</h4>
              <p>
                <a v-if="item.link" :href="item.link" target="_blank" rel="noopener">
                  {{ item.value }}
                </a>
                <span v-else>{{ item.value }}</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Formulario de contacto -->
        <div class="contact__form-container">
          <form @submit.prevent="handleSubmit" class="contact__form">
            <h4 class="contact__form-title">Envíame un mensaje</h4>

            <div class="contact__form-group">
              <label for="name" class="contact__label">Nombre</label>
              <input type="text" id="name" v-model="form.name" class="contact__input"
                :class="{ 'contact__input--error': errors.name }" placeholder="Tu nombre completo" required>
              <span v-if="errors.name" class="contact__error">{{ errors.name }}</span>
            </div>

            <div class="contact__form-group">
              <label for="email" class="contact__label">Email</label>
              <input type="email" id="email" v-model="form.email" class="contact__input"
                :class="{ 'contact__input--error': errors.email }" placeholder="tu@email.com" required>
              <span v-if="errors.email" class="contact__error">{{ errors.email }}</span>
            </div>

            <div class="contact__form-group">
              <label for="subject" class="contact__label">Asunto</label>
              <input type="text" id="subject" v-model="form.subject" class="contact__input"
                placeholder="Asunto del mensaje">
            </div>

            <div class="contact__form-group">
              <label for="message" class="contact__label">Mensaje</label>
              <textarea id="message" v-model="form.message" class="contact__textarea"
                :class="{ 'contact__input--error': errors.message }" placeholder="Escribe tu mensaje aquí..." rows="5"
                required></textarea>
              <span v-if="errors.message" class="contact__error">{{ errors.message }}</span>
            </div>

            <button type="submit" class="contact__submit" :disabled="isSubmitting"
              :class="{ 'contact__submit--loading': isSubmitting }">
              <span v-if="!isSubmitting">Enviar Mensaje</span>
              <span v-else>Enviando...</span>
            </button>

            <!-- Mensaje de estado -->
            <div v-if="submitMessage" class="contact__message"
              :class="{ 'contact__message--success': submitSuccess, 'contact__message--error': !submitSuccess }">
              {{ submitMessage }}
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, computed, reactive } from 'vue'

export default {
  name: 'ContactSection',
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
    const form = reactive({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const errors = ref({})
    const isSubmitting = ref(false)
    const submitMessage = ref('')
    const submitSuccess = ref(false)

    const contactItems = computed(() => [
      {
        type: 'email',
        label: 'Email',
        value: props.contactData.email,
        icon: '📧',
        link: `mailto:${props.contactData.email}`
      },
      {
        type: 'phone',
        label: 'Teléfono',
        value: props.contactData.phone,
        icon: '📱',
        link: `tel:${props.contactData.phone}`
      },
      {
        type: 'location',
        label: 'Ubicación',
        value: props.contactData.address || props.personalData.location,
        icon: '📍',
        link: null
      },
      {
        type: 'linkedin',
        label: 'LinkedIn',
        value: props.contactData.linkedin.replace('https://linkedin.com/in/', '/in/'),
        icon: '💼',
        link: props.contactData.linkedin
      }
    ])

    const validateForm = () => {
      errors.value = {}

      if (!form.name.trim()) {
        errors.value.name = 'El nombre es requerido'
      }

      if (!form.email.trim()) {
        errors.value.email = 'El email es requerido'
      } else if (!/\S+@\S+\.\S+/.test(form.email)) {
        errors.value.email = 'El email no es válido'
      }

      if (!form.message.trim()) {
        errors.value.message = 'El mensaje es requerido'
      } else if (form.message.length < 10) {
        errors.value.message = 'El mensaje debe tener al menos 10 caracteres'
      }

      return Object.keys(errors.value).length === 0
    }

    const handleSubmit = async () => {
      if (!validateForm()) {
        return
      }

      isSubmitting.value = true
      submitMessage.value = ''

      try {
        // Simular envío del formulario
        // Aquí deberías integrar con tu servicio de email (EmailJS, Netlify Forms, etc.)

        await new Promise(resolve => setTimeout(resolve, 2000))

        // Simular éxito (en producción esto dependería del servicio real)
        submitSuccess.value = true
        submitMessage.value = '¡Mensaje enviado correctamente! Te responderé pronto.'

        // Limpiar formulario
        Object.keys(form).forEach(key => {
          form[key] = ''
        })

      } catch (error) {
        submitSuccess.value = false
        submitMessage.value = 'Error al enviar el mensaje. Por favor, inténtalo de nuevo.'
      } finally {
        isSubmitting.value = false

        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          submitMessage.value = ''
        }, 5000)
      }
    }

    return {
      form,
      errors,
      isSubmitting,
      submitMessage,
      submitSuccess,
      contactItems,
      handleSubmit
    }
  }
}
</script>

<style lang="scss" scoped>
.contact {
  background: $bg-white;

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;

    @include lg {
      grid-template-columns: 1fr 1fr;
    }
  }

  &__info {
    display: grid;
    gap: 1.5rem;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: $bg-light;
    border-radius: $radius-lg;
    transition: all $transition-base;
    animation: fadeInLeft 0.8s ease-out both;

    &:hover {
      transform: translateX(10px);
      box-shadow: $shadow-md;
    }
  }

  &__icon {
    font-size: 1.5rem;
    width: 3rem;
    height: 3rem;
    background: $primary-color;
    color: $text-white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__details {
    flex: 1;

    h4 {
      font-weight: $font-semibold;
      margin-bottom: 0.25rem;
      color: $text-primary;
    }

    p {
      margin: 0;
      color: $text-secondary;

      a {
        color: $primary-color;
        text-decoration: none;
        transition: color $transition-base;

        &:hover {
          color: $accent-color;
        }
      }
    }
  }

  &__form-container {
    background: $bg-light;
    padding: 2rem;
    border-radius: $radius-lg;
    animation: fadeInRight 0.8s ease-out both;
  }

  &__form {
    width: 100%;
  }

  &__form-title {
    font-size: $font-xl;
    font-weight: $font-semibold;
    color: $text-primary;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  &__form-group {
    margin-bottom: 1.5rem;
  }

  &__label {
    display: block;
    font-weight: $font-medium;
    color: $text-primary;
    margin-bottom: 0.5rem;
    font-size: $font-sm;
  }

  &__input,
  &__textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 2px solid $border-color;
    border-radius: $radius-md;
    font-size: $font-base;
    transition: all $transition-base;
    font-family: inherit;

    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
    }

    &::placeholder {
      color: $text-secondary;
    }

    &--error {
      border-color: #ef4444;

      &:focus {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
      }
    }
  }

  &__textarea {
    resize: vertical;
    min-height: 120px;
  }

  &__error {
    display: block;
    color: #ef4444;
    font-size: $font-xs;
    margin-top: 0.25rem;
  }

  &__submit {
    width: 100%;
    background: $primary-color;
    color: $text-white;
    border: none;
    padding: 1rem 2rem;
    border-radius: $radius-md;
    font-size: $font-base;
    font-weight: $font-semibold;
    cursor: pointer;
    transition: all $transition-base;
    position: relative;
    overflow: hidden;

    &:hover:not(:disabled) {
      background: $primary-dark;
      transform: translateY(-2px);
      box-shadow: $shadow-lg;
    }

    &:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    &--loading {
      &::after {
        content: '';
        position: absolute;
        top: 50%;
        right: 1rem;
        width: 1rem;
        height: 1rem;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }
    }
  }

  &__message {
    margin-top: 1rem;
    padding: 0.75rem 1rem;
    border-radius: $radius-md;
    text-align: center;
    font-weight: $font-medium;
    animation: slideDown 0.3s ease-out;

    &--success {
      background: rgba(34, 197, 94, 0.1);
      color: #16a34a;
      border: 1px solid rgba(34, 197, 94, 0.3);
    }

    &--error {
      background: rgba(239, 68, 68, 0.1);
      color: #dc2626;
      border: 1px solid rgba(239, 68, 68, 0.3);
    }
  }
}

// Animaciones
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

// Responsive
@media (max-width: 1023px) {
  .contact {
    &__content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    &__form-container {
      padding: 1.5rem;
    }
  }
}

@media (max-width: 767px) {
  .contact {
    &__item {
      flex-direction: column;
      text-align: center;
      padding: 1rem;

      &:hover {
        transform: translateY(-5px);
      }
    }

    &__icon {
      margin-bottom: 0.5rem;
    }

    &__form-container {
      padding: 1rem;
    }

    &__submit {
      padding: 0.875rem 1.5rem;
    }
  }
}

// Dark mode
@include dark-mode {
  .contact {
    background: $bg-medium;

    &__item {
      background: $bg-dark;
    }

    &__details {
      h4 {
        color: $text-white;
      }

      p {
        color: $text-light;
      }
    }

    &__form-container {
      background: $bg-dark;
    }

    &__form-title {
      color: $text-white;
    }

    &__label {
      color: $text-white;
    }

    &__input,
    &__textarea {
      background: $bg-medium;
      border-color: $border-dark;
      color: $text-white;

      &::placeholder {
        color: $text-light;
      }

      &:focus {
        border-color: $primary-color;
      }
    }
  }
}

// Estados especiales para animaciones secuenciales
.contact__item:nth-child(1) {
  animation-delay: 0.1s;
}

.contact__item:nth-child(2) {
  animation-delay: 0.2s;
}

.contact__item:nth-child(3) {
  animation-delay: 0.3s;
}

.contact__item:nth-child(4) {
  animation-delay: 0.4s;
}
</style>
