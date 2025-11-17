import { defineStore } from 'pinia'
import { ref } from 'vue'
import { productsApi } from '@/api/products'
import { categoriesApi } from '@/api/categories'
import type { Product, FilterParams, Category } from '@/types/product'
import type { ApiError } from '@/types/api'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const categories = ref<Category[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalProducts = ref(0)

  const fetchProducts = async (params?: FilterParams) => {
    loading.value = true
    error.value = null
    try {
      const response = await productsApi.getAll(params)
      products.value = response.data
      if (response.data.length < (params?.limit || 12)) {
        totalProducts.value = (params?.offset || 0) + response.data.length
      } else {
        totalProducts.value = (params?.offset || 0) + (params?.limit || 12) + 1
      }
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
    } finally {
      loading.value = false
    }
  }

  const fetchProductById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await productsApi.getById(id)
      currentProduct.value = response.data
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
    } finally {
      loading.value = false
    }
  }

  const fetchCategories = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await categoriesApi.getAll()
      categories.value = response.data
    } catch (err) {
      const apiError = err as ApiError
      error.value = apiError.message
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    categories,
    currentProduct,
    loading,
    error,
    totalProducts,
    fetchProducts,
    fetchProductById,
    fetchCategories
  }
})

