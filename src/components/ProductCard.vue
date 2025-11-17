<script setup lang="ts">
import type { Product } from '@/types/product.ts'
import { useCartStore } from '@/stores/cart.ts'
import { useFavoriteStore } from '@/stores/favorites.ts'
import { useRouter } from 'vue-router'

const props = defineProps<{
  product: Product
}>()

const router = useRouter()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()

const handleAddToCart = () => {
  cartStore.addToCart(props.product)
}

const handleToggleFavorite = () => {
  favoriteStore.toggleFavorite(props.product)
}

const goToProduct = () => {
  router.push({ name: 'product-detail', params: { id: props.product.id } })
}
</script>

<template>
  <div class="card h-100">
    <img :src="props.product.images[0]" class="card-img-top" :alt="props.product.title" @click="goToProduct" />

    <div class="card-body">
      <h5 class="card-title">{{ props.product.title }}</h5>

      <span class="badge bg-secondary">{{ props.product.category.name }}</span>

      <p class="card-text text-muted small">{{ props.product.description.substring(0, 100) }}...</p>

      <p class="fw-bold">${{ props.product.price.toFixed(2) }}</p>
    </div>
    <div class="card-footer bg-white">
      <button
        class="btn me-2"
        :class="{
          'btn-danger': favoriteStore.isFavorite(props.product.id),
          'btn-outline-danger': !favoriteStore.isFavorite(props.product.id),
        }"
        @click="handleToggleFavorite"
      > ♡ </button>

      <button
        class="btn btn-primary"
        @click="handleAddToCart"
      >В кошик</button>
    </div>
  </div>
</template>

<style scoped></style>
