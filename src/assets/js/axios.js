
import axios from 'axios'
import {Toast} from 'antd-mobile'

// 请求拦截器，在请求发到接口之前
axios.interceptors.request.use(function(config){
 // 显示loading
 Toast.loading('加载中...',0)

    return config
}, function (error) {
    return Promise.reject(error)
})

// 响应拦截器，在响应回到页面之前
axios.interceptors.response.use(function(response){
    Toast.hide()
    // 不能直接获取res，需要提取它的data属性，提取出来的结果就是接口返回的内容
    return response.data
}, function (error) {
    return Promise.reject(error)
})

export default axios
