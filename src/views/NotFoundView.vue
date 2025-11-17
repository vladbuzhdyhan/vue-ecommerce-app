<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home' })
}
</script>

<template>
    <div class="container my-5">
      <div class="text-center">
        <h1 class="display-1 fw-bold"> 404 </h1>
        <p class="fs-3"> Сторінку не знайдено</p>
        <p class="text-muted">Вибачте, але сторінка, яку ви шукаєте, не існує.</p>
        <button @click="goToHome" class="btn btn-primary btn-lg mt-3">
          На головну
        </button>
      </div>
    </div>
</template>

<style scoped>

</style>
