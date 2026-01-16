<script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  import { jobService } from '@/services/api'
  import InfoCard from '@/components/InfoCard.vue'
  import JobCardSimple from '@/components/JobCardSimple.vue'
  import type { Job } from '@/types/job'
  
  // Import the hero image so Vite processes it correctly
  import heroImageUrl from '@/assets/images/hero-bg.jpg'
  
  const featuredJobs = ref<Job[]>([])
  const loading = ref(true)
  const searchQuery = ref('')
  
  // Filter logic: Checks title, company, and location
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
      console.error('Error fetching featured jobs:', error)
    } finally {
      loading.value = false
    }
  })
  </script>
  
  <template>
    <div class="min-h-screen">
      <div 
        class="relative text-white py-24 bg-cover bg-center bg-no-repeat"
        :style="{ 
          backgroundImage: `linear-gradient(rgba(22, 163, 74, 0.85), rgba(22, 163, 74, 0.9)), url(${heroImageUrl})` 
        }"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 class="text-5xl md:text-6xl font-bold mb-4 drop-shadow-md">Find Your Dream Job</h1>
          <p class="text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Connect with top employers and discover opportunities that match your skills
          </p>
          
          <div class="max-w-md mx-auto relative">
            <i class="pi pi-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="Search roles, companies, or locations..." 
              class="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-4 focus:ring-green-300 shadow-2xl transition-all"
            />
          </div>
        </div>
      </div>
  
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div v-if="searchQuery">
          <div class="flex justify-between items-center mb-8 border-b pb-4">
            <div>
              <h2 class="text-3xl font-bold text-gray-800">Search Results</h2>
              <p class="text-gray-500">Found {{ filteredJobs.length }} matches for "{{ searchQuery }}"</p>
            </div>
            <button 
              @click="searchQuery = ''" 
              class="flex items-center gap-2 text-green-600 hover:text-green-800 font-medium transition-colors"
            >
              <i class="pi pi-times-circle"></i>
              <span>Clear Search</span>
            </button>
          </div>
  
          <div v-if="filteredJobs.length > 0" class="grid md:grid-cols-3 gap-6">
            <JobCardSimple
              v-for="job in filteredJobs"
              :key="job.id"
              :job="job"
            />
          </div>
          
          <div v-else class="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <i class="pi pi-search-plus text-6xl text-gray-200 mb-4"></i>
            <p class="text-xl text-gray-400">We couldn't find any jobs matching that criteria.</p>
            <button @click="searchQuery = ''" class="mt-4 text-green-600 font-bold">Try browsing all jobs instead</button>
          </div>
        </div>
  
        <div v-else>
          <div class="grid md:grid-cols-2 gap-8 mb-20">
            <InfoCard
              title="For Job Seekers"
              icon="pi pi-user"
              description="Browse our extensive job listings and start your career journey today."
              button-text="Browse Jobs"
              link-to="/jobs"
              variant="secondary"
            />
            <InfoCard
              title="For Employers"
              icon="pi pi-building"
              description="List your job opening to find the perfect candidate for your team."
              button-text="Add Job"
              link-to="/jobs/add"
              variant="primary"
            />
          </div>
  
          <div class="bg-gray-50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16 rounded-3xl">
            <div class="max-w-7xl mx-auto">
              <div class="flex items-center justify-center gap-3 mb-10">
                <i class="pi pi-bolt text-yellow-500 text-2xl"></i>
                <h2 class="text-3xl font-bold text-gray-800 text-center">Featured Opportunities</h2>
              </div>
              
              <div v-if="loading" class="text-center py-12">
                <i class="pi pi-spin pi-spinner text-5xl text-green-600"></i>
                <p class="mt-4 text-gray-500 font-medium">Loading latest jobs...</p>
              </div>
              
              <div v-else-if="featuredJobs.length > 0">
                <div class="grid md:grid-cols-3 gap-8">
                  <JobCardSimple
                    v-for="job in featuredJobs.slice(0, 3)"
                    :key="job.id"
                    :job="job"
                  />
                </div>
  
                <div class="text-center mt-12">
                  <router-link
                    to="/jobs"
                    class="inline-flex items-center gap-2 bg-green-600 text-white px-10 py-4 rounded-full font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    <span>Explore All Jobs</span>
                    <i class="pi pi-arrow-right"></i>
                  </router-link>
                </div>
              </div>
              
              <div v-else class="text-center py-12 text-gray-500">
                No jobs available at the moment.
              </div>
            </div>
          </div>
        </div>
        </div>
    </div>
  </template>
  
  