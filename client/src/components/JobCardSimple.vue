<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import type { Job } from '@/types/job'
  
  interface Props {
    job: Job
  }
  
  const props = defineProps<Props>()
  
  const router = useRouter()
  
  const handleClick = () => {
    if (props.job.id) {
      router.push(`/jobs/${props.job.id}`)
    }
  }
  </script>

  
<template>
  <div
    class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    @click="handleClick"
  >
    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ job.title }}</h3>
    <p class="text-gray-600 mb-2">{{ job.company }}</p>
    <p class="text-gray-500 text-sm mb-4">{{ job.location }}</p>
    <span class="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
      {{ job.type }}
    </span>
  </div>
</template>


