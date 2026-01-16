<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue' // Added computed
  import { jobService } from '@/services/api'
  import InfoCard from '@/components/InfoCard.vue'
  import JobCardSimple from '@/components/JobCardSimple.vue'
  import type { Job } from '@/types/job'
  
  const featuredJobs = ref<Job[]>([])
  const loading = ref(true)
  
  // 1. ADD: The search query state
  const searchQuery = ref('')
  
  // 2. ADD: The logic to filter jobs based on search
  const filteredJobs = computed(() => {
    if (!searchQuery.value) return []
    
    const query = searchQuery.value.toLowerCase()
    return featuredJobs.value.filter(job => 
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.location.toLowerCase().includes(query)
    )
  })
  
  onMounted(async () => {
    try {
      const jobs = await jobService.getAllJobs()
      featuredJobs.value = jobs
    } catch (error) {
      console.error('Error fetching jobs:', error)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <template>
    <div class="min-h-screen">
      <div class="bg-primary-600 text-white py-20">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 class="text-5xl font-bold mb-4">Find Your Dream Job</h1>
          <p class="text-xl text-primary-100 mb-8">Connect with top employers and discover opportunities</p>
          
          <div class="max-w-md mx-auto relative">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search roles, companies, or locations..." 
              class="w-full pl-12 pr-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary-300 shadow-lg"
            />
          </div>
        </div>
      </div>
  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div v-if="searchQuery">
          <div class="flex justify-between items-center mb-8">
            <h2 class="text-3xl font-bold text-gray-800">Search Results</h2>
            <button @click="searchQuery = ''" class="text-primary-600 font-medium hover:text-primary-800">
              Clear Search
            </button>
          </div>
  
          <div v-if="filteredJobs.length > 0" class="grid md:grid-cols-3 gap-6">
            <JobCardSimple
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
            />
          </div>
          
          <div v-else class="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
            <i class="pi pi-search-plus text-5xl text-gray-300 mb-4"></i>
            <p class="text-xl text-gray-500">No jobs found matching "{{ searchQuery }}"</p>
          </div>
        </div>
  
        <div v-else>
          <div class="grid md:grid-cols-2 gap-8 mb-16">
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
  
          <div class="bg-white py-16">
            <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">Featured Jobs</h2>
            
            <div v-if="loading" class="text-center py-8">
              <i class="pi pi-spin pi-spinner text-4xl text-primary-600"></i>
            </div>
            
            <div v-else class="grid md:grid-cols-3 gap-6">
              <JobCardSimple
                v-for="job in featuredJobs.slice(0, 3)"
                :key="job.id"
                :job="job"
              />
            </div>
  
            <div class="text-center mt-8">
              <router-link to="/jobs" class="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-semibold shadow-md">
                View All Jobs
              </router-link>
            </div>
          </div>
        </div>
        </div>
    </div>
  </template>