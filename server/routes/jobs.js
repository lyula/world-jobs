import express from 'express'
import {
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob
} from '../controllers/jobController.js'

const router = express.Router()

router.route('/')
  .get(getAllJobs)
  .post(createJob)

router.route('/:id')
  .get(getJobById)
  .put(updateJob)
  .delete(deleteJob)

export default router
