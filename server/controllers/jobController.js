import Job from '../models/Job.js'

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findById(id)

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      })
    }

    res.status(200).json({
      success: true,
      data: job
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      postedDate: req.body.postedDate || new Date().toISOString().split('T')[0]
    }

    const job = await Job.create(jobData)

    res.status(201).json({
      success: true,
      data: job
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        error: messages
      })
    }

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const updateJob = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    )

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      })
    }

    res.status(200).json({
      success: true,
      data: job
    })
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message)
      return res.status(400).json({
        success: false,
        error: messages
      })
    }

    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}

export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findByIdAndDelete(id)

    if (!job) {
      return res.status(404).json({
        success: false,
        error: 'Job not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
      data: {}
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    })
  }
}
