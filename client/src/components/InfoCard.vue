<script setup lang="ts">
  import { computed } from 'vue'
  
  interface Props {
    title: string
    description: string
    buttonText: string
    linkTo: string
    variant?: 'primary' | 'secondary'
  }
  
  const props = withDefaults(defineProps<Props>(), {
    variant: 'secondary'
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
      ? 'inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors'
      : 'inline-block bg-gray-800 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors'
  })
  </script>
  
<template>
  <div :class="cardClasses">
    <h2 class="text-2xl font-bold mb-4" :class="titleClasses">
      {{ title }}
    </h2>
    <p class="mb-6" :class="descriptionClasses">
      {{ description }}
    </p>
    <router-link
      :to="linkTo"
      :class="buttonClasses"
    >
      {{ buttonText }}
    </router-link>
  </div>
</template>


