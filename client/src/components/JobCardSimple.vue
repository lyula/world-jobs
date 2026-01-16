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
    class="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all cursor-pointer flex flex-col h-full group"
    @click="handleClick"
  >
    <div class="mb-3">
      <span class="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
        {{ job.type }}
      </span>
    </div>

    <div class="mb-4">
      <h3 class="text-xl font-bold text-gray-800 group-hover:text-primary-600 transition-colors mb-1">
        {{ job.title }}
      </h3>
      <p class="text-primary-600 font-medium">{{ job.company }}</p>
    </div>

    <div class="space-y-2 mb-6 flex-grow">
      <div class="flex items-center text-gray-500 text-sm">
        <i class="pi pi-map-marker mr-2 text-primary-500"></i>
        <span>{{ job.location }}</span>
      </div>

      <div v-if="job.salary" class="flex items-center text-gray-500 text-sm">
        <i class="pi pi-dollar mr-2 text-primary-500"></i>
        <span>{{ job.salary }}</span>
      </div>
    </div>

    <div class="pt-4 border-t border-gray-100 flex items-center text-primary-600 font-semibold text-sm">
      <span>View Details</span>
      <i class="pi pi-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
    </div>
  </div>
</template>