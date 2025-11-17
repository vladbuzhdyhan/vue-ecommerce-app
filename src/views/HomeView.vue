<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import { useProductsStore } from '@/stores/products.ts'
import { useRoute } from 'vue-router'
import FilterBar from '@/components/FilterBar.vue'
import ProductList from '@/components/ProductList.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import { storeToRefs } from 'pinia'

const currentPage = ref<number>(1)
const itemsPerPage = ref<number>(12)

const productsStore = useProductsStore()
const { products, categories, loading, error } = storeToRefs(productsStore)

const route = useRoute()

const totalPages = computed(() => Math.ceil(productsStore.totalProducts / itemsPerPage.value))

const loadProducts = () => {
  const offset = (currentPage.value - 1) * itemsPerPage.value

  const filters = {
    title: route.query.title as string | undefined,
    price_min: route.query.price_min ? Number(route.query.price_min) : undefined,
    price_max: route.query.price_max ? Number(route.query.price_max) : undefined,
    categoryId: route.query.categoryId ? Number(route.query.categoryId) : undefined,
    offset: offset,
    limit: itemsPerPage.value
  }
  productsStore.fetchProducts(filters)
}

const handlePageChange = (page: number) => {
  currentPage.value = page
  loadProducts()
}

onMounted(() => {
  productsStore.fetchCategories()
  loadProducts()
})

watch(() => route.query, () => {
  currentPage.value = 1
  loadProducts()
})
</script>

<template>
  <div class="container my-4">
    <h1 class="mb-4">Каталог товарів</h1>

    <FilterBar :categories="categories" />

    <div v-if="error" class="alert alert-danger" role="alert">
       Помилка: {{ error }}
    </div>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Завантаження...</span>
      </div>
      <p class="mt-3 text-muted">Завантаження товарів...</p>
    </div>

    <div v-else>
      <ProductList :products="products" />

      <div class="d-flex justify-content-center mt-4">
        <PaginationComponent
          :total-pages="totalPages"
          :current-page="currentPage"
          @page-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

