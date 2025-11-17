import apiClient from '@/api/axios.ts'
import type { Category } from '@/types/product'

export const categoriesApi = {
  getAll: () => {
    return apiClient.get<Category[]>('/categories')
  },

  getById: (id: number) => {
    return apiClient.get<Category>(`/categories/${id}`)
  }
}
