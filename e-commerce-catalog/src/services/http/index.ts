import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * new instance of axios
 */
const httpService = axios.create()

/**
 * Request interceptor, setting base url and headers
 */
httpService.interceptors.request.use(
  (cfg: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const config = { ...cfg }
    config.baseURL = process.env.VITE_APP_API_URL
    config.headers.Accept = 'application/json'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Response interceptor, return only data
 */
httpService.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response.data,
  error => Promise.reject(error)
)

export default httpService
