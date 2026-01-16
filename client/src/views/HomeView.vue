<template>
  <div class="min-h-screen">
    <div class="bg-primary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-5xl font-bold mb-4">Find Your Dream Job</h1>
        <p class="text-xl text-primary-100 mb-8">
          Connect with top employers and discover opportunities that match your skills
        </p>
        <div class="max-w-md mx-auto relative">
          <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="Search roles or companies..." 
            class="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg"
          />
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid md:grid-cols-2 gap-8">
        <InfoCard
          title="For Job Seekers"
          icon="pi pi-briefcase"
          description="Browse our extensive job listings and start your career journey today."
          button-text="Browse Jobs"
          link-to="/jobs"
          variant="secondary"
        />
        <InfoCard
          title="For Employers"
          icon="pi pi-plus-circle"
          description="List your job opening to find the perfect candidate for your team."
          button-text="Add Job"
          link-to="/jobs/add"
          variant="primary"
        />
      </div>
    </div>

    <div class="bg-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-center gap-3 mb-8">
          <i class="pi pi-star-fill text-yellow-500 text-2xl"></i>
          <h2 class="text-3xl font-bold text-gray-800 text-center">Featured Jobs</h2>
        </div>
        
        <div v-if="loading" class="text-center py-12">
          <i class="pi pi-spin pi-spinner text-5xl text-primary-600"></i>
          <p class="mt-4 text-gray-500">Discovering opportunities...</p>
        </div>
        
        <div v-else-if="featuredJobs.length > 0" class="grid md:grid-cols-3 gap-6">
          <JobCardSimple
            v-for="job in featuredJobs.slice(0, 3)"
            :key="job.id"
            :job="job"
          />
        </div>
        
        <div v-else class="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
          <i class="pi pi-search text-4xl text-gray-300 mb-3"></i>
          <p class="text-gray-500">No jobs available at the moment. Check back soon!</p>
        </div>

        <div v-if="featuredJobs.length > 0" class="text-center mt-12">
          <router-link
            to="/jobs"
            class="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-4 rounded-md font-semibold hover:bg-primary-700 transition-all shadow-md hover:shadow-lg"
          >
            <span>View All Jobs</span>
            <i class="pi pi-arrow-right"></i>
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
    // This now calls your Express backend
    const jobs = await jobService.getAllJobs()
    featuredJobs.value = jobs
  } catch (error) {
    console.error('Error fetching featured jobs:', error)
  } finally {
    loading.value = false
  }
})
</script>