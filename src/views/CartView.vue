<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const { items, totalItems, totalPrice } = storeToRefs(cartStore)

const router = useRouter()

const updateQuantity = (productId: number, quantity: number) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId: number) => {
  cartStore.removeFromCart(productId)
}

const clearAll = () => {
  cartStore.clearCart()
}

const goToHome = () => {
  router.push({ name: 'home' })
}
const goToNotFound = () => {
  router.push({ name: 'not-found' })
}
</script>

<template>
  <div class="container my-4">
    <h1 class="mb-4">Кошик</h1>

    <div v-if="items.length === 0" class="text-center py-5">
      <p class="fs-4 text-muted">Ваш кошик порожній</p>
      <button @click="goToHome" class="btn btn-primary">Перейти до покупок</button>
    </div>

    <div v-else>
      <div class="row">
        <div class="col-lg-8">
          <div v-for="item in items" :key="item.product.id" class="card mb-3">
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-md-2">
                  <img
                    :src="item.product.images[0]"
                    :alt="item.product.title"
                    class="img-fluid rounded"
                  />
                </div>

                <div class="col-md-4">
                  <h5>{{ item.product.title }}</h5>
                  <p class="text-muted">${{ item.product.price.toFixed(2) }}</p>
                </div>

                <div class="col-md-3">
                  <div class="input-group">
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(item.product.id, item.quantity - 1)"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      class="form-control text-center"
                      :value="item.quantity"
                      @input="updateQuantity(item.product.id, Number($event.target.value))"
                      min="1"
                    />
                    <button
                      class="btn btn-outline-secondary"
                      @click="updateQuantity(item.product.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div class="col-md-3 text-end">
                  <p class="fw-bold fs-5">${{ (item.product.price * item.quantity).toFixed(2) }}</p>
                  <button class="btn btn-danger btn-sm" @click="removeItem(item.product.id)">
                     Видалити
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="card">
            <div class="card-body">
              <h5>Підсумок замовлення</h5>
              <p>Товарів: {{ totalItems }}</p>
              <p class="fs-4 fw-bold">Загалом: ${{ totalPrice.toFixed(2) }}</p>
              <button class="btn btn-success w-100 mb-2" @click="goToNotFound">Оформити замовлення</button>
              <button @click="clearAll" class="btn btn-danger w-100">Очистити кошик</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
