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
        
        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-2">
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

        <!-- Mobile Hamburger Button -->
        <div class="md:hidden flex items-center">
          <button
            @click="toggleMobileMenu"
            class="flex items-center justify-center w-10 h-10 text-white hover:bg-gray-700 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-xl"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Menu -->
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden pb-4 space-y-2 border-t border-gray-700 mt-2 pt-4"
      >
        <router-link
          to="/"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 px-4 py-3 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors w-full"
          active-class="bg-primary-600"
        >
          <i class="pi pi-home text-sm"></i>
          <span>Home</span>
        </router-link>
        <router-link
          to="/jobs"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 px-4 py-3 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors w-full"
          active-class="bg-primary-600"
        >
          <i class="pi pi-briefcase text-sm"></i>
          <span>Jobs</span>
        </router-link>
        <router-link
          to="/jobs/add"
          @click="closeMobileMenu"
          class="flex items-center space-x-2 px-4 py-3 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors w-full"
          active-class="bg-primary-600"
        >
          <i class="pi pi-plus-circle text-sm"></i>
          <span>Add Job</span>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import logoImage from '@/assets/images/world-jobs2.jpg'

const isMobileMenuOpen = ref(false)
const route = useRoute()

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Close mobile menu when route changes
watch(() => route.path, () => {
  closeMobileMenu()
})
</script>
