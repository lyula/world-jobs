<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">All Job Listings</h1>
        <p class="text-gray-600">Discover opportunities that match your career goals</p>
      </div>

      <div v-if="loading" class="text-center py-16">
        <i class="pi pi-spin pi-spinner text-5xl text-primary-600"></i>
        <p class="mt-4 text-gray-600">Loading jobs...</p>
      </div>

      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <i class="pi pi-exclamation-triangle text-4xl text-red-600 mb-4"></i>
        <p class="text-red-800">{{ error }}</p>
      </div>

      <div v-else-if="jobs.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <JobCard
          v-for="job in jobs"
          :key="job.id"
          :job="job"
          :show-edit="true"
          :show-delete="true"
          :show-description="true"
          @delete="deleteJob"
        />
      </div>

      <div v-else class="text-center py-16">
        <i class="pi pi-briefcase text-6xl text-gray-300 mb-4"></i>
        <p class="text-xl text-gray-600 mb-4">No jobs found</p>
        <router-link
          to="/jobs/add"
          class="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Add Your First Job
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification'
import { jobService } from '@/services/api'
import JobCard from '@/components/JobCard.vue'
import type { Job } from '@/types/job'

const toast = useToast()

const jobs = ref<Job[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadJobs = async () => {
  loading.value = true
  error.value = null
  try {
    jobs.value = await jobService.getAllJobs()
  } catch (err) {
    error.value = 'Failed to load jobs. Please check if the backend server is running.'
    console.error('Error loading jobs:', err)
  } finally {
    loading.value = false
  }
}

// FIX: id is now string/number for MongoDB compatibility
const deleteJob = async (id: string | number) => {
  if (!confirm('Are you sure you want to delete this job?')) {
    return
  }

  try {
    await jobService.deleteJob(id)
    toast.success('Job deleted successfully')
    await loadJobs()
  } catch (err) {
    toast.error('Failed to delete job')
    console.error('Error deleting job:', err)
  }
}

onMounted(() => {
  loadJobs()
})
</script>