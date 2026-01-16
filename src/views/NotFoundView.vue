<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p class="text-xl text-gray-600 mb-8">
          Sorry, we couldn't find the page you're looking for. The page might have been moved or doesn't exist.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/"
          class="inline-block bg-primary-600 text-white px-8 py-3 rounded-md font-medium hover:bg-primary-700 transition-colors"
        >
          <i class="pi pi-home mr-2"></i>
          Go Home
        </router-link>
        <router-link
          to="/jobs"
          class="inline-block bg-gray-800 text-white px-8 py-3 rounded-md font-medium hover:bg-gray-900 transition-colors"
        >
          <i class="pi pi-briefcase mr-2"></i>
          Browse Jobs
        </router-link>
      </div>

      <div class="mt-12">
        <i class="pi pi-exclamation-triangle text-6xl text-gray-300"></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
