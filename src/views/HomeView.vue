<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <div class="bg-primary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p class="text-xl text-primary-100">Connect with top employers and discover opportunities that match your skills</p>
      </div>
    </div>

    <!-- Cards Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <InfoCard
          title="For Job Seekers"
          description="Browse our extensive job listings and start your career journey today. Find opportunities that match your skills and aspirations."
          button-text="Browse Jobs"
          link-to="/jobs"
          variant="secondary"
        />
        <InfoCard
          title="For Employers"
          description="List your job opening to find the perfect candidate for your team. Reach talented professionals ready to make an impact."
          button-text="Add Job"
          link-to="/jobs/add"
          variant="primary"
        />
      </div>
    </div>

    <!-- Featured Jobs Preview -->
    <div class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Jobs</h2>
        <div v-if="loading" class="text-center py-8">
          <i class="pi pi-spin pi-spinner text-4xl text-primary-600"></i>
        </div>
        <div v-else-if="featuredJobs.length > 0" class="grid md:grid-cols-3 gap-6">
          <JobCardSimple
            v-for="job in featuredJobs.slice(0, 3)"
            :key="job.id"
            :job="job"
          />
        </div>
        <div v-else class="text-center py-8 text-gray-500">
          No jobs available at the moment
        </div>
        <div v-if="featuredJobs.length > 0" class="text-center mt-8">
          <router-link
            to="/jobs"
            class="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Jobs
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { jobService } from '@/services/api'
import InfoCard from '@/components/InfoCard.vue'
import JobCardSimple from '@/components/JobCardSimple.vue'
import type { Job } from '@/types/job'

const featuredJobs = ref<Job[]>([])
const loading = ref(true)

onMounted(async () => {
  try {
    const jobs = await jobService.getAllJobs()
    featuredJobs.value = jobs
  } catch (error) {
    console.error('Error fetching featured jobs:', error)
  } finally {
    loading.value = false
  }
})
</script>
