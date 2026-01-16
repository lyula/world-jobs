# World Expert Jobs - Setup Guide

Follow these step-by-step instructions to get your job listing platform up and running.

## Step 1: Verify Prerequisites

Before starting, make sure you have:

1. **Node.js** installed (version 18 or higher)
   - Check by running: `node --version`
   - Download from: https://nodejs.org/

2. **pnpm** installed (version 8 or higher)
   - Check by running: `pnpm --version`
   - If not installed, run: `npm install -g pnpm`

## Step 2: Install Dependencies

Open your terminal/command prompt in the project directory and run:

```bash
pnpm install
```

This will install all required packages:
- Vue.js 3 with TypeScript
- TailwindCSS
- PrimeVue and PrimeVue Icons
- Vue Router
- Vue Toastifications
- JSON Server
- Axios
- And all other dependencies

**Expected output:** You should see a success message and a `node_modules` folder will be created.

## Step 3: Start the JSON Server (Backend)

The JSON Server acts as your backend API. You need to run it in a separate terminal window.

**Open a new terminal window** and navigate to the project directory, then run:

```bash
pnpm json-server
```

**Expected output:**
```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3001/jobs

  Home
  http://localhost:3001

  Type s + enter at any time to create a snapshot of the database
  Watching...
```

**Important:** 
- Keep this terminal window open while developing
- The JSON Server must be running for the application to work
- It will watch `db.json` for changes automatically

## Step 4: Start the Development Server

**Open another terminal window** (keep the JSON Server terminal running) and navigate to the project directory, then run:

```bash
pnpm dev
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + show help
```

The application should automatically open in your browser at `http://localhost:5173/`

## Step 5: Verify Everything is Working

1. **Check the Home Page:**
   - You should see the "World Expert Jobs" navbar
   - A green hero section with "Find Your Dream Job"
   - Two cards: "For Job Seekers" and "For Employers"
   - Featured jobs section at the bottom

2. **Navigate to Jobs:**
   - Click "Jobs" in the navbar
   - You should see 5 sample jobs displayed in a grid

3. **View a Job Detail:**
   - Click on any job card
   - You should see full job details with description and requirements

4. **Add a Job:**
   - Click "Add Job" in the navbar
   - Fill out the form and submit
   - You should see a success toast notification
   - The new job should appear in the jobs list

5. **Edit a Job:**
   - From the jobs list, click "Edit" on any job
   - Modify the information and save
   - Verify changes are reflected

6. **Delete a Job:**
   - Click the trash icon on any job card
   - Confirm deletion
   - Verify the job is removed

## Project Structure Explained

```
world-expert-jobs/
├── src/
│   ├── components/          # Reusable components
│   │   └── Navbar.vue      # Navigation bar (used on all pages)
│   ├── views/              # Page components (routes)
│   │   ├── HomeView.vue    # Landing page
│   │   ├── JobsView.vue    # List all jobs
│   │   ├── JobDetailView.vue  # View single job
│   │   ├── AddJobView.vue  # Create new job
│   │   └── EditJobView.vue # Edit existing job
│   ├── router/
│   │   └── index.ts        # Route configuration
│   ├── services/
│   │   └── api.ts          # API service layer
│   ├── types/
│   │   └── job.ts          # TypeScript interfaces
│   ├── App.vue             # Root component
│   ├── main.ts             # Application entry point
│   └── style.css           # Global styles
├── db.json                 # JSON Server database
├── package.json            # Dependencies and scripts
└── README.md              # Project documentation
```

## Common Issues and Solutions

### Issue: "Cannot find module" errors

**Solution:** Run `pnpm install` again to ensure all dependencies are installed.

### Issue: JSON Server not found

**Solution:** Make sure you've run `pnpm install`. JSON Server is a dev dependency.

### Issue: Port 3001 already in use

**Solution:** Either:
- Close the application using port 3001
- Or modify the `package.json` script: `"json-server": "json-server --watch db.json --port 3002"`

### Issue: Port 5173 already in use

**Solution:** Vite will automatically use the next available port. Check the terminal output for the actual port.

### Issue: Cannot connect to API / Jobs not loading

**Solution:** 
- Ensure JSON Server is running (Step 3)
- Check that it's running on `http://localhost:3001`
- Verify `db.json` exists in the project root

### Issue: TypeScript errors

**Solution:**
- Ensure you're using Node.js v18 or higher
- Run `pnpm install` to ensure all TypeScript dependencies are installed
- Restart your IDE/editor

## Development Workflow

1. **Making Changes:**
   - Edit files in `src/`
   - Vite will automatically reload the page (Hot Module Replacement)

2. **Adding New Features:**
   - Components go in `src/components/`
   - New pages go in `src/views/`
   - Add routes in `src/router/index.ts`
   - Update API service in `src/services/api.ts` if needed

3. **Modifying Data:**
   - Edit `db.json` directly
   - JSON Server will automatically detect changes

## Building for Production

When you're ready to deploy:

```bash
pnpm build
```

This creates a `dist/` folder with optimized production files.

To preview the production build:

```bash
pnpm preview
```

## Next Steps

Once everything is working:

1. **Customize the Theme:** Edit `tailwind.config.js` to change colors
2. **Add More Fields:** Extend the `Job` interface in `src/types/job.ts`
3. **Add Authentication:** Implement user authentication if needed
4. **Add Search/Filter:** Implement search and filtering functionality
5. **Add Pagination:** For better performance with many jobs

## Need Help?

- Check the `README.md` for detailed documentation
- Review the code comments in source files
- Ensure all prerequisites are met
- Verify both servers are running (JSON Server and Vite dev server)

---

**You're all set! Happy coding! 🚀**
