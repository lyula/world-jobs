<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-8">Add New Job</h1>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
            <input id="title" v-model="formData.title" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder="e.g., Senior Vue.js Developer" />
          </div>

          <div>
            <label for="company" class="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
            <input id="company" v-model="formData.company" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Job Type *</label>
              <select id="type" v-model="formData.type" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500">
                <option value="">Select Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Remote">Remote</option>
              </select>
            </div>
            <div>
              <label for="salary" class="block text-sm font-medium text-gray-700 mb-2">Salary Range *</label>
              <input id="salary" v-model="formData.salary" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder="e.g., $100k - $120k" />
            </div>
          </div>

          <div>
            <label for="location" class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
            <input id="location" v-model="formData.location" type="text" required class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" />
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">Job Description *</label>
            <textarea id="description" v-model="formData.description" required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500"></textarea>
          </div>

          <div>
            <label for="requirements" class="block text-sm font-medium text-gray-700 mb-2">Requirements * (one per line)</label>
            <textarea id="requirements" v-model="formData.requirements" required rows="5" class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500" placeholder="Requirement 1&#10;Requirement 2"></textarea>
          </div>

          <div class="flex justify-end space-x-4 pt-6 border-t">
            <router-link to="/jobs" class="px-6 py-3 border rounded-md text-gray-700 hover:bg-gray-50">Cancel</router-link>
            <button type="submit" :disabled="submitting" class="px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center space-x-2">
              <i v-if="submitting" class="pi pi-spin pi-spinner"></i>
              <span>{{ submitting ? 'Creating...' : 'Create Job' }}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { jobService } from '@/services/api'
import type { JobFormData } from '@/types/job'

const router = useRouter()
const toast = useToast()
const submitting = ref(false)

const formData = ref<JobFormData>({
  title: '',
  company: '',
  location: '',
  type: '',
  salary: '',
  description: '',
  requirements: ''
})

const handleSubmit = async () => {
  submitting.value = true
  try {
    // Process the newline-separated string into an array for MongoDB
    const requirementsArray = formData.value.requirements
      .split('\n')
      .map(req => req.trim())
      .filter(req => req.length > 0)

    const payload = {
      ...formData.value,
      requirements: requirementsArray
    }

    await jobService.createJob(payload)
    toast.success('Job created successfully!')
    router.push('/jobs')
  } catch (error) {
    toast.error('Failed to create job. Please try again.')
    console.error('Error creating job:', error)
  } finally {
    submitting.value = false
  }
}
</script>