<script setup lang="ts">
  import { useRouter } from 'vue-router'
  import type { Job } from '@/types/job'
  
  // Define the shape of our props
  interface Props {
    job: Job
    showEdit?: boolean
    showDelete?: boolean
    showDescription?: boolean
  }
  
  // Set default values for optional props
  const props = withDefaults(defineProps<Props>(), {
    showEdit: true,
    showDelete: true,
    showDescription: true
  })
  
  /**
   * FIXED: The emit expects a string. 
   * Even if the Job interface allows string | number, we cast it to string here.
   */
  const emit = defineEmits<{
    delete: [id: string]
  }>()
  
  const router = useRouter()
  
  const handleClick = () => {
    if (props.job.id) {
      router.push(`/jobs/${props.job.id}`)
    }
  }
  
  const handleEdit = () => {
    if (props.job.id) {
      router.push(`/jobs/edit/${props.job.id}`)
    }
  }
  
  const handleDelete = () => {
    if (props.job.id) {
      // FIXED: Using String() to ensure the argument is always a string
      // This resolves: Argument of type 'string | number' is not assignable to parameter of type 'string'
      emit('delete', String(props.job.id))
    }
  }
  </script>
  
  <template>
    <div
      class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer border border-gray-200"
      @click="handleClick"
    >
      <div class="flex justify-between items-start mb-4">
        <h2 class="text-xl font-bold text-gray-800 hover:text-primary-600 transition-colors">
          {{ job.title }}
        </h2>
        <button
          v-if="showDelete && job.id"
          @click.stop="handleDelete"
          class="text-red-500 hover:text-red-700 p-1 transition-colors"
          title="Delete job"
        >
          <i class="pi pi-trash"></i>
        </button>
      </div>
  
      <p class="text-primary-600 font-semibold mb-2">{{ job.company }}</p>
  
      <div class="flex items-center text-gray-600 mb-2">
        <i class="pi pi-map-marker mr-2"></i>
        <span>{{ job.location }}</span>
      </div>
  
      <div class="flex items-center text-gray-600 mb-4">
        <i class="pi pi-dollar mr-2"></i>
        <span>{{ job.salary }}</span>
      </div>
  
      <div class="flex items-center justify-between">
        <span class="bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium">
          {{ job.type }}
        </span>
        <button
          v-if="showEdit && job.id"
          @click.stop="handleEdit"
          class="text-primary-600 hover:text-primary-800 font-medium transition-colors"
        >
          Edit
        </button>
      </div>
  
      <p v-if="showDescription" class="text-gray-600 text-sm mt-4 line-clamp-2">
        {{ job.description }}
      </p>
    </div>
  </template>