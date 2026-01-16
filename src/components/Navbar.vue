<template>
  <nav class="sticky top-0 z-50 bg-gray-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center space-x-3">
            <img
              :src="logoImage"
              alt="World Expert Jobs Logo"
              class="h-10 w-10 object-cover rounded-full"
            />
            <span class="hidden md:block text-white font-bold text-xl">World Expert Jobs</span>
          </router-link>
        </div>
        <div class="flex items-center space-x-2">
          <router-link
            to="/"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 relative group"
          >
            <i class="pi pi-home text-sm"></i>
            <span>Home</span>
            <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
          </router-link>
          <router-link
            to="/jobs"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 relative group"
          >
            <i class="pi pi-briefcase text-sm"></i>
            <span>Jobs</span>
            <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
          </router-link>
          <router-link
            to="/jobs/add"
            class="flex items-center space-x-2 px-4 py-2 rounded-lg text-white font-medium hover:bg-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 relative group"
          >
            <i class="pi pi-plus-circle text-sm"></i>
            <span>Add Job</span>
            <span class="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full"></span>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import logoImage from '@/assets/images/world-jobs2.jpg'
</script>
