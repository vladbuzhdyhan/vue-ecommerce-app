import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useLocalStorage } from '@/composable/useLocalStorage'
import type {CartItem, Product} from '@/types/product'

export const useCartStore = defineStore('cart', () => {
  const items = useLocalStorage<CartItem[]>('cart', [])

  const totalItems = computed(() => {
    return items.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  const totalPrice = computed(() => {
    return items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  })

  const addToCart = (product: Product) => {
    const existingItem = items.value.find(item => item.product.id === product.id)

    if (existingItem) {
      existingItem.quantity++
    } else {
      items.value.push({product, quantity: 1})
    }
  }

  const removeFromCart = (productId: number) => {
    const index = items.value.findIndex(item => item.product.id === productId)

    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }

  const updateQuantity = (productId: number, quantity) => {
    const item = items.value.find(item => item.product.id === productId)

    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  const clearCart = () => {
    items.value = []
  }

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
})
