# World Expert Jobs

A professional job listing platform built with Vue.js, TypeScript, TailwindCSS, PrimeVue Icons, and Vue Toastifications. This application allows users to browse, add, edit, and delete job listings with a beautiful, modern UI.

## Features

- 🎯 **Browse Jobs** - View all available job listings in a clean, organized grid
- ➕ **Add Jobs** - Create new job postings with detailed information
- ✏️ **Edit Jobs** - Update existing job listings
- 🗑️ **Delete Jobs** - Remove job postings with confirmation
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI** - Beautiful green-themed interface matching professional standards
- 🔔 **Toast Notifications** - User-friendly feedback for all actions

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **TypeScript** - Type-safe JavaScript
- **Vue Router** - Client-side routing
- **TailwindCSS** - Utility-first CSS framework
- **PrimeVue Icons** - Icon library
- **Vue Toastifications** - Toast notification system
- **JSON Server** - RESTful API mock server
- **Axios** - HTTP client
- **pnpm** - Fast, disk space efficient package manager

## Project Structure

```
world-expert-jobs/
├── src/
│   ├── components/       # Reusable Vue components
│   │   └── Navbar.vue   # Navigation bar component
│   ├── views/           # Page components
│   │   ├── HomeView.vue
│   │   ├── JobsView.vue
│   │   ├── JobDetailView.vue
│   │   ├── AddJobView.vue
│   │   └── EditJobView.vue
│   ├── router/          # Vue Router configuration
│   │   └── index.ts
│   ├── services/        # API services
│   │   └── api.ts
│   ├── types/           # TypeScript type definitions
│   │   └── job.ts
│   ├── App.vue          # Root component
│   ├── main.ts          # Application entry point
│   └── style.css        # Global styles
├── db.json              # JSON Server database
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **pnpm** (v8 or higher)

If you don't have pnpm installed, you can install it globally using:

```bash
npm install -g pnpm
```

## Installation Steps

### Step 1: Install Dependencies

Navigate to the project directory and install all dependencies:

```bash
pnpm install
```

### Step 2: Start JSON Server

In a separate terminal window, start the JSON Server to act as your backend API:

```bash
pnpm json-server
```

This will start the JSON Server on `http://localhost:3001` with the sample job data from `db.json`.

**Important:** Keep this terminal window running while developing. The JSON Server must be running for the application to work properly.

### Step 3: Start Development Server

In another terminal window (keep the JSON server running), start the Vue development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

## Usage

### Browsing Jobs

1. Click on **"Jobs"** in the navigation bar to view all available job listings
2. Click on any job card to view detailed information
3. Use the search and filter features (if implemented) to find specific jobs

### Adding a Job

1. Click on **"Add Job"** in the navigation bar
2. Fill out the job form with the following information:
   - Job Title
   - Company Name
   - Location
   - Job Type (Full-time, Part-time, Contract, etc.)
   - Salary Range
   - Job Description
   - Requirements (one per line)
3. Click **"Create Job"** to submit

### Editing a Job

1. Navigate to a job listing page
2. Click the **"Edit"** button (or edit from the jobs list)
3. Modify the job information as needed
4. Click **"Update Job"** to save changes

### Deleting a Job

1. From the jobs list, click the trash icon on any job card
2. Or navigate to a job detail page and click the **"Delete"** button
3. Confirm the deletion when prompted

## Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm preview` - Preview the production build
- `pnpm json-server` - Start the JSON Server backend

## API Endpoints

The JSON Server provides the following RESTful endpoints:

- `GET /jobs` - Get all jobs
- `GET /jobs/:id` - Get a specific job
- `POST /jobs` - Create a new job
- `PUT /jobs/:id` - Update a job
- `DELETE /jobs/:id` - Delete a job

## Customization

### Theme Colors

The application uses a green color scheme. To customize colors, edit `tailwind.config.js`:

```js
colors: {
  primary: {
    // Your custom green shades
  }
}
```

### Sample Data

Edit `db.json` to modify or add sample job data. The JSON Server will automatically reflect these changes.

## Troubleshooting

### JSON Server Not Running

If you see errors about failed API calls, make sure the JSON Server is running:
- Check that the terminal with `pnpm json-server` is still active
- Verify it's running on `http://localhost:3001`
- Restart the JSON Server if needed

### Port Conflicts

If port 3001 (JSON Server) or 5173 (Vite) is already in use:
- For JSON Server: Modify the port in `package.json` scripts
- For Vite: The dev server will automatically use the next available port

### TypeScript Errors

If you encounter TypeScript errors:
- Run `pnpm install` again to ensure all dependencies are installed
- Check that your Node.js version is compatible (v18+)

## Production Build

To create a production build:

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## License

This project is open source and available for educational and commercial use.

## Support

For issues or questions, please check the documentation or create an issue in the project repository.

---

**Happy Job Hunting! 🚀**
