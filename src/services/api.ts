import axios from 'axios'
import type { Job } from '@/types/job'

const API_BASE_URL = 'http://localhost:3001'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const jobService = {
  async getAllJobs(): Promise<Job[]> {
    const response = await api.get<Job[]>('/jobs')
    return response.data
  },

  async getJobById(id: number): Promise<Job> {
    const response = await api.get<Job>(`/jobs/${id}`)
    return response.data
  },

  async createJob(job: Omit<Job, 'id'>): Promise<Job> {
    const response = await api.post<Job>('/jobs', {
      ...job,
      postedDate: new Date().toISOString().split('T')[0]
    })
    return response.data
  },

  async updateJob(id: number, job: Partial<Job>): Promise<Job> {
    const response = await api.put<Job>(`/jobs/${id}`, job)
    return response.data
  },

  async deleteJob(id: number): Promise<void> {
    await api.delete(`/jobs/${id}`)
  }
}
