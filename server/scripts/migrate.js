import dotenv from 'dotenv'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import connectDatabase from '../config/database.js'
import Job from '../models/Job.js'
import mongoose from 'mongoose'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

async function migrate() {
  try {
    // Connect to MongoDB using config
    await connectDatabase()
    console.log('✅ Connected to MongoDB')

    // Read db.json file
    const dbPath = join(__dirname, '../../db.json')
    const dbData = JSON.parse(readFileSync(dbPath, 'utf-8'))
    const jobs = dbData.jobs || []

    console.log(`📦 Found ${jobs.length} jobs to migrate`)

    // Clear existing jobs (optional - remove if you want to keep existing data)
    const existingJobs = await Job.countDocuments()
    if (existingJobs > 0) {
      console.log(`⚠️  Found ${existingJobs} existing jobs in database`)
      const clear = process.argv.includes('--clear')
      if (clear) {
        await Job.deleteMany({})
        console.log('🗑️  Cleared existing jobs')
      } else {
        console.log('ℹ️  Use --clear flag to remove existing jobs before migration')
      }
    }

    // Insert jobs
    let imported = 0
    let skipped = 0

    for (const jobData of jobs) {
      // Check if job already exists (by title and company)
      const existing = await Job.findOne({
        title: jobData.title,
        company: jobData.company
      })

      if (existing) {
        console.log(`⏭️  Skipped: ${jobData.title} at ${jobData.company} (already exists)`)
        skipped++
        continue
      }

      // Remove id field (MongoDB will generate _id)
      const { id, ...jobWithoutId } = jobData

      // Create new job
      const job = new Job(jobWithoutId)
      await job.save()
      console.log(`✅ Imported: ${job.title} at ${job.company}`)
      imported++
    }

    console.log('\n📊 Migration Summary:')
    console.log(`   ✅ Imported: ${imported}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   📦 Total: ${jobs.length}`)

    await mongoose.connection.close()
    console.log('✅ Migration completed successfully')
    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    await mongoose.connection.close()
    process.exit(1)
  }
}

migrate()
