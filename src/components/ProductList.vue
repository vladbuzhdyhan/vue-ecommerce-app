<script setup lang="ts">
import type { Product } from '@/types/product.ts'
import ProductCard from '@/components/ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>

<template>
  <div class="row g-4">

    <div v-for="p in products" :key="p.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
      <ProductCard :product="p" />
    </div>
  </div>

  <div v-if="products.length === 0" class="text-center py-5">
    <p class="text-muted fs-5">Товари не знайдені </p>
  </div>
</template>
