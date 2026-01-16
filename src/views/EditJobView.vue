<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
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

      <!-- Edit Form -->
      <div v-else class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Edit Job</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Job Title -->
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Senior Vue.js Developer"
            />
          </div>

          <!-- Company Name -->
          <div>
            <label for="company" class="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              id="company"
              v-model="formData.company"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., Tech Innovations Inc."
            />
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              id="location"
              v-model="formData.location"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="e.g., San Francisco, CA"
            />
          </div>

          <!-- Job Type and Salary -->
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                id="type"
                v-model="formData.type"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div>
              <label for="salary" class="block text-sm font-medium text-gray-700 mb-2">
                Salary Range *
              </label>
              <input
                id="salary"
                v-model="formData.salary"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., $100,000 - $150,000"
              />
            </div>
          </div>

          <!-- Job Description -->
          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              required
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Describe the job position, responsibilities, and what makes it great..."
            ></textarea>
          </div>

          <!-- Requirements -->
          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 mb-2">
              Requirements * (one per line)
            </label>
            <textarea
              id="requirements"
              v-model="formData.requirements"
              required
              rows="6"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter each requirement on a new line"
            ></textarea>
          </div>

          <!-- Submit Buttons -->
          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <router-link
              :to="jobId ? `/jobs/${jobId}` : '/jobs'"
              class="px-6 py-3 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </router-link>
            <button
              type="submit"
              :disabled="submitting"
              class="px-6 py-3 bg-primary-600 text-white rounded-md font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <i v-if="submitting" class="pi pi-spin pi-spinner"></i>
              <span>{{ submitting ? 'Updating...' : 'Update Job' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { jobService } from '@/services/api'
import type { JobFormData, Job } from '@/types/job'

const route = useRoute()
const router = useRouter()
const toast = useToast()

const jobId = ref<number | null>(null)
const formData = ref<JobFormData>({
  title: '',
  company: '',
  location: '',
  type: '',
  salary: '',
  description: '',
  requirements: ''
})

const loading = ref(true)
const submitting = ref(false)
const error = ref<string | null>(null)

const loadJob = async () => {
  loading.value = true
  error.value = null
  try {
    const id = parseInt(route.params.id as string)
    jobId.value = id
    const job = await jobService.getJobById(id)
    
    formData.value = {
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      description: job.description,
      requirements: job.requirements.join('\n')
    }
  } catch (err) {
    error.value = 'Job not found. It may have been deleted.'
    console.error('Error loading job:', err)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  if (!jobId.value) return

  submitting.value = true

  try {
    const requirements = formData.value.requirements
      .split('\n')
      .map(req => req.trim())
      .filter(req => req.length > 0)

    const jobData: Partial<Job> = {
      ...formData.value,
      requirements
    }

    await jobService.updateJob(jobId.value, jobData)
    toast.success('Job updated successfully!')
    router.push(`/jobs/${jobId.value}`)
  } catch (error) {
    toast.error('Failed to update job. Please try again.')
    console.error('Error updating job:', error)
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  loadJob()
})
</script>
