<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  'page-change': [page: number]
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('page-change', page)
  }
}

const nextPage = () => {
  goToPage(props.currentPage + 1)
}

const prevPage = () => {
  goToPage(props.currentPage - 1)
}
</script>

<template>
  <nav v-if="props.totalPages > 1">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: props.currentPage === 1 }">
        <button class="page-link" @click="prevPage">Попередня</button>
      </li>

      <li class="page-item active">
        <span class="page-link">
          Сторінка {{ props.currentPage }}
        </span>
      </li>

      <li class="page-item" :class="{ disabled: props.currentPage === props.totalPages }">
        <button class="page-link" @click="nextPage">Наступна</button>
      </li>
    </ul>
  </nav>
</template>

