import axios from 'axios'

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.ecocuriositylab.me/api'
    : 'http://localhost:8000/api'

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: false, // Changed to false for now to avoid CORS issues
  timeout: 10000, // 10 second timeout
})

// Add debug logging in development
if (process.env.NODE_ENV !== 'production') {
  api.interceptors.request.use(
    config => {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
      })
      return config
    },
    error => {
      console.error('❌ API Request Error:', error)
      return Promise.reject(error)
    }
  )

  api.interceptors.response.use(
    response => {
      console.log('✅ API Response:', {
        status: response.status,
        data: response.data,
        headers: response.headers,
      })
      return response
    },
    error => {
      console.error('❌ API Response Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config,
      })
      return Promise.reject(error)
    }
  )
}

// Add auth token to requests
api.interceptors.request.use(config => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user')
      // Redirect to login page
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
