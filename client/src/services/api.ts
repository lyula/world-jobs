import axios from 'axios'
import type { Job } from '@/types/job'

// Use production API URL if deployed, otherwise use local
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD 
    ? 'https://world-jobs.onrender.com' 
    : 'http://localhost:4000/api')

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Response wrapper type matching your Express Controller output
interface ApiResponse<T> {
  success: boolean
  data: T
  count?: number
  message?: string
  error?: string
}

export const jobService = {
  async getAllJobs(): Promise<Job[]> {
    const response = await api.get<ApiResponse<Job[]>>('/jobs')
    // Extract data from the backend's { success, data, count } wrapper
    const jobs = response.data.data
    
    return (Array.isArray(jobs) ? jobs : []).map((job: any) => ({
      ...job,
      id: job._id || job.id
    }))
  },

  async getJobById(id: string | number): Promise<Job> {
    const response = await api.get<ApiResponse<Job>>(`/jobs/${id}`)
    const job = response.data.data
    
    return {
      ...job,
      id: (job as any)._id || job.id
    }
  },

  async createJob(job: Omit<Job, 'id'>): Promise<Job> {
    const response = await api.post<ApiResponse<Job>>('/jobs', {
      ...job,
      postedDate: job.postedDate || new Date().toISOString().split('T')[0]
    })
    const createdJob = response.data.data
    
    return {
      ...createdJob,
      id: (createdJob as any)._id || createdJob.id
    }
  },

  async updateJob(id: string | number, job: Partial<Job>): Promise<Job> {
    const response = await api.put<ApiResponse<Job>>(`/jobs/${id}`, job)
    const updatedJob = response.data.data
    
    return {
      ...updatedJob,
      id: (updatedJob as any)._id || updatedJob.id
    }
  },

  async deleteJob(id: string | number): Promise<void> {
    await api.delete(`/jobs/${id}`)
  }
}