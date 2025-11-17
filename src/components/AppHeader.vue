<script setup lang="ts">
import { useCartStore } from '@/stores/cart.ts'
import { useFavoriteStore } from '@/stores/favorites.ts'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const favoritesStore = useFavoriteStore()

const {totalItems} = storeToRefs(cartStore)
const {totalFavorites} = storeToRefs(favoritesStore)

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        E-Commerce
      </router-link>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              Головна
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'favorites' }" class="nav-link">
               Улюблені
              <span v-if="totalFavorites > 0" class="badge bg-danger rounded-pill ms-1">
                {{ totalFavorites }}
              </span>
            </router-link>
          </li>

          <li class="nav-item">
            <router-link :to="{ name: 'cart' }" class="nav-link">
              Кошик
              <span v-if="totalItems > 0" class="badge bg-primary rounded-pill ms-1">
                {{ totalItems }}
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

