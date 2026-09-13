import axios from 'axios'
import { getApiBaseUrl } from '@/lib/dcomm-api'

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

function readTokenFromCookie() {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(
    new RegExp('(^| )dcomm_admin_token=([^;]+)'),
  )
  return match?.[2] || null
}

api.interceptors.request.use(
  (config) => {
    const token = readTokenFromCookie()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error(
        `Falha de rede com a API (${getApiBaseUrl()}). Verifique se o back-end está online e com CORS habilitado.`,
      )
    }
    return Promise.reject(error)
  },
)

export default api
