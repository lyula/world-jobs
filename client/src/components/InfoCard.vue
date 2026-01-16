<script setup lang="ts">
  import { computed } from 'vue'
  
  interface Props {
    title: string
    description: string
    buttonText: string
    linkTo: string
    variant?: 'primary' | 'secondary'
    icon?: string // Added icon prop
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'secondary',
    icon: '' // Default to empty string
  })
  
  const cardClasses = computed(() => {
    return props.variant === 'primary'
      ? 'bg-primary-500 rounded-lg p-8 shadow-md'
      : 'bg-gray-100 rounded-lg p-8 shadow-md'
  })
  
  const titleClasses = computed(() => {
    return props.variant === 'primary' ? 'text-white' : 'text-gray-800'
  })
  
  const descriptionClasses = computed(() => {
    return props.variant === 'primary' ? 'text-primary-50' : 'text-gray-600'
  })
  
  const buttonClasses = computed(() => {
    return props.variant === 'primary'
      ? 'inline-block bg-primary-700 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-800 transition-colors'
      : 'inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors'
  })
  
  // Dynamically handle icon colors based on the variant
  const iconClasses = computed(() => {
    return props.variant === 'primary' ? 'text-white' : 'text-primary-600'
  })
  </script>
  
  <template>
    <div :class="cardClasses" class="flex flex-col h-full">
      <div class="flex items-center gap-3 mb-4">
        <i v-if="icon" :class="[icon, iconClasses, 'text-3xl']"></i>
        <h2 class="text-2xl font-bold" :class="titleClasses">
          {{ title }}
        </h2>
      </div>
  
      <p class="mb-6 flex-grow" :class="descriptionClasses">
        {{ description }}
      </p>
  
      <div>
        <router-link
          :to="linkTo"
          :class="buttonClasses"
        >
          {{ buttonText }}
        </router-link>
      </div>
    </div>
  </template>