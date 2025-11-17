import apiClient from '@/api/axios.ts'
import type { Product, FilterParams } from '@/types/product'

export const productsApi = {
  getAll: (params?: FilterParams) => {
    return apiClient.get<Product[]>('/products', {params})
  },

  getById: (id: number) => {
    return apiClient.get<Product>(`/products/${id}`)
  }
}
