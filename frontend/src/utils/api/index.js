import axios from 'axios'
import { toast } from 'vue3-toastify'

export default {
  QUERY(options, defaultError = true, customHeaders = {}, signal = null) {
    const data = options.data
    const token = localStorage.getItem('token')

    return new Promise((resolve, reject) => {
      axios({
        url: options.url,
        method: options.method,
        headers: {
          'Accept-Language': 'ru',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        signal,
        params: options.params,
        data,
        responseType: options.responseType,
      })
        .then((response) => resolve(response))
        .catch((error) => {
          console.log('error', error.status);
          toast(`Ошибка сервера, обратись к админу`, { autoClose: 2000, type: 'error', position: 'top-center' })

          resolve(error)
        })
    })
  },
}
