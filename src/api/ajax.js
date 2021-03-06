import axios from "axios"
import { baseURL } from "./baseURL"
const instance = axios.create({
    baseURL,
    timeout: 20000
})
// 请求拦截器
instance.interceptors.request.use(config => {
    return config
}, (error) => { return Promise.reject(error) }
)
// 响应拦截器
instance.interceptors.response.use((response) => {
    return response
},
    (error) => {
        console.log(error.message);
        return new Promise(() => { })
    }
)
export default instance