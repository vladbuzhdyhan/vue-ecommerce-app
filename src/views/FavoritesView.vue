<script setup lang="ts">
import { useFavoriteStore } from '@/stores/favorites.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import ProductList from '@/components/ProductList.vue'

const favoritesStore = useFavoriteStore()
const { items } = storeToRefs(favoritesStore)

const router = useRouter()

const goToHome = () => {
  router.push({ name: 'home'})
}
</script>

<template>
  <div class="container my-4">
    <h1 class="mb-4"> Улюблені товари</h1>

    <div v-if="items.length === 0" class="text-center py-5">
      <p class="fs-4 text-muted">У вас поки немає улюблених товарів</p>
      <button @click="goToHome" class="btn btn-primary">
        Перейти до каталогу
      </button>
    </div>

    <div v-else>
      <ProductList :products="items" />
    </div>
  </div>
</template>

<style scoped>

</style>
