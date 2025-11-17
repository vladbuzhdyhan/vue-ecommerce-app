import axios from 'axios'
import type { ApiError } from '@/types/api'

const apiClient = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || error.message || 'Ой, сталася помилка',
      statusCode: error.response?.status,
      error: error.response?.data?.error
    }
    return Promise.reject(apiError)
  }
)

export default apiClient
