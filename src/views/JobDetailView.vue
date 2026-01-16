<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-16">
        <i class="pi pi-spin pi-spinner text-5xl text-primary-600"></i>
        <p class="mt-4 text-gray-600">Loading job details...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <i class="pi pi-exclamation-triangle text-4xl text-red-600 mb-4"></i>
        <p class="text-red-800 mb-4">{{ error }}</p>
        <router-link
          to="/jobs"
          class="inline-block bg-primary-600 text-white px-6 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          Back to Jobs
        </router-link>
      </div>

      <!-- Job Details -->
      <div v-else-if="job" class="bg-white rounded-lg shadow-lg p-8">
        <div class="mb-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h1 class="text-4xl font-bold text-gray-800 mb-2">{{ job.title }}</h1>
              <p class="text-2xl text-primary-600 font-semibold">{{ job.company }}</p>
            </div>
            <div class="flex space-x-2">
              <button
                @click="editJob"
                class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 transition-colors flex items-center space-x-2"
              >
                <i class="pi pi-pencil"></i>
                <span>Edit</span>
              </button>
              <button
                @click="deleteJob"
                class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <i class="pi pi-trash"></i>
                <span>Delete</span>
              </button>
            </div>
          </div>

          <div class="flex flex-wrap gap-4 mb-6">
            <div class="flex items-center text-gray-600">
              <i class="pi pi-map-marker mr-2 text-primary-600"></i>
              <span>{{ job.location }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <i class="pi pi-dollar mr-2 text-primary-600"></i>
              <span>{{ job.salary }}</span>
            </div>
            <div class="flex items-center text-gray-600">
              <i class="pi pi-calendar mr-2 text-primary-600"></i>
              <span>Posted: {{ formatDate(job.postedDate) }}</span>
            </div>
          </div>

          <span class="inline-block bg-primary-100 text-primary-800 px-4 py-2 rounded-full font-medium">
            {{ job.type }}
          </span>
        </div>

        <div class="border-t border-gray-200 pt-6 mb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Job Description</h2>
          <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ job.description }}</p>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Requirements</h2>
          <ul class="list-disc list-inside space-y-2">
            <li v-for="(requirement, index) in job.requirements" :key="index" class="text-gray-700">
              {{ requirement }}
            </li>
          </ul>
        </div>

        <div class="mt-8 pt-6 border-t border-gray-200 flex justify-between">
          <router-link
            to="/jobs"
            class="text-primary-600 hover:text-primary-800 font-medium flex items-center space-x-2"
          >
            <i class="pi pi-arrow-left"></i>
            <span>Back to All Jobs</span>
          </router-link>
          <button
            class="bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors font-medium"
            @click="applyForJob"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { jobService } from '@/services/api'
import type { Job } from '@/types/job'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const job = ref<Job | null>(null)
const loading = ref(true)
const error = ref<string | null>(null)

const loadJob = async () => {
  loading.value = true
  error.value = null
  try {
    const jobId = parseInt(route.params.id as string)
    job.value = await jobService.getJobById(jobId)
  } catch (err) {
    error.value = 'Job not found. It may have been deleted.'
    console.error('Error loading job:', err)
  } finally {
    loading.value = false
  }
}

const editJob = () => {
  if (job.value?.id) {
    router.push(`/jobs/edit/${job.value.id}`)
  }
}

const deleteJob = async () => {
  if (!job.value?.id) return

  if (!confirm('Are you sure you want to delete this job?')) {
    return
  }

  try {
    await jobService.deleteJob(job.value.id)
    toast.success('Job deleted successfully')
    router.push('/jobs')
  } catch (err) {
    toast.error('Failed to delete job')
    console.error('Error deleting job:', err)
  }
}

const applyForJob = () => {
  toast.info('Application feature coming soon!')
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  loadJob()
})
</script>
