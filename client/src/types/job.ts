export interface Job {
  id?: string | number
  _id?: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string[]
  postedDate?: string
  createdAt?: string
  updatedAt?: string
}

export interface JobFormData {
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  requirements: string
}
