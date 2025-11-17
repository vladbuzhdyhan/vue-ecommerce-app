<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div id="app">
    <AppHeader />

    <main class="main-content">
      <router-view :key="$route.path" />
    </main>

    <FooterComponent />
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
}
</style>
