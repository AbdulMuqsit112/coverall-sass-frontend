import axios from 'axios'
import pinia from '@/store/pinia.js'
const axiosInstance = axios.create({
  baseURL: 'https://0dc4-103-244-173-47.ngrok-free.app/sas/v1/',
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
