import axios from 'axios'
import pinia from '@/store/pinia.js'
const axiosInstance = axios.create({
  baseURL: 'https://f8e2-2400-adc1-49e-3300-dde4-7dc-15c4-6856.ngrok-free.app/sas/v1/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.token}`,
    "ngrok-skip-browser-warning": "69420"
  }
})
pinia.use(({ store }) => {
  store.$http = axiosInstance
})

export default {
  install(app) {
    app.config.globalProperties.$http = axiosInstance;
  }
}
