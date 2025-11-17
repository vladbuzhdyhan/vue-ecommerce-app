import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@/composable/useLocalStorage.ts'
import type {Product} from '@/types/product.ts'

export const useFavoriteStore = defineStore('favorites', () => {
  const items = useLocalStorage<Product>('favorites', [])

  const totalFavorites = computed(() => items.value.length)

  const isFavorite = (productId: number) => {
    return items.value.some(item => item.id === productId)
  }

  const addToFavorites = (product: Product) => {
    if (!isFavorite(product.id)) {
      items.value.push(product)
    }
  }

  const removeFromFavorites = (productId: number) => {
    const index = items.value.findIndex(item => item.id === productId)

    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const toggleFavorite = (product: Product) => {
    if(isFavorite(product.id)) {
      removeFromFavorites(product.id)
    } else {
      addToFavorites(product)
    }
  }

  return {
    items,
    totalFavorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite
  }
})
