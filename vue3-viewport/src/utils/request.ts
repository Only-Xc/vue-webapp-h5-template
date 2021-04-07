import axios from 'axios'

const service = axios.create({
  timeout: 8000
})

service.interceptors.request.use(
  config => {
    const token = 'xxxxx'

    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
