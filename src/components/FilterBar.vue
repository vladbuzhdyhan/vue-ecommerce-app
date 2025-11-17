<script setup lang="ts">
import { ref } from 'vue'
import { useProductsStore } from '@/stores/products.ts'
import { useRouter } from 'vue-router'
import type { Category } from '@/types/product.ts'

defineProps<{
  categories: Category[]
}>()

const title = ref<string>('')
const priceMin = ref<number | null>(null)
const priceMax = ref<number | null>(null)
const selectedCategory = ref<number | null>(null)

const router = useRouter()
const productsStore = useProductsStore()

const applyFilters = () => {
  router.push({
    query: {
      title: title.value || undefined,
      price_min: priceMin.value || undefined,
      price_max: priceMax.value || undefined,
      categoryId: selectedCategory.value || undefined,
      offset: 0,
      limit: 12
    }
  })

  productsStore.fetchProducts({
    title: title.value || undefined,
    price_min: priceMin.value || undefined,
    price_max: priceMax.value || undefined,
    categoryId: selectedCategory.value || undefined,
    offset: 0,
    limit: 12
  })
}

const clearFilters = () => {
  title.value = ''
  priceMin.value = null
  priceMax.value = null
  selectedCategory.value = null

  router.push({ query: {} })

  productsStore.fetchProducts({ offset: 0, limit: 12 })
}
</script>

<template>
  <div class="card mb-4">
    <div class="card-body">
      <h5 class="card-title">Фільтри</h5>

      <div class="mb-3">
        <label class="form-label">Назва товару</label>
        <input
          v-model="title"
          type="text"
          class="form-control"
          placeholder="Пошук за назвою...">
      </div>

      <div class="row mb-3">
        <div class="col-md-6">
          <label class="form-label">Мін. ціна</label>
          <input
            v-model.number="priceMin"
            type="number"
            class="form-control"
            placeholder="0">
        </div>
        <div class="col-md-6">
          <label class="form-label">Макс. ціна</label>
          <input
            v-model.number="priceMax"
            type="number"
            class="form-control"
            placeholder="1000">
        </div>
      </div>

      <div class="mb-3">
        <label class="form-label">Категорія</label>
        <select v-model.number="selectedCategory" class="form-select">
          <option :value="null">Всі категорії</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="d-flex gap-2">
        <button
          @click="applyFilters"
          class="btn btn-primary flex-fill">
          Застосувати
        </button>
        <button
          @click="clearFilters"
          class="btn btn-secondary">
          Очистити
        </button>
      </div>
    </div>
  </div>
</template>
