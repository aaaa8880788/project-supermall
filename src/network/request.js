import axios from 'axios'
export function request(config) {
  // 1.创建对应的axios的实例
  const instance = axios.create({
    // baseURL: 'http://localhost:3000',//这个是自用接口
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    // timeout: 5000
  })

  // 2.axios的拦截器
  // 2.1请求拦截的作用
  // instance.interceptors.request.use(config => {
  //   // console.log(config);

  //   // 1.比如config中的一些信息不符合服务器的要求

  //   // 2.比如每次发送网络请求时都希望在界面中显示一个请求的图标

  //   // 3.某些网络请求(比如登录(token)),必须携带一些特殊的信息

  //   return config
  // }, err => {
  //   console.log(err);
  // })

  // 响应拦截

  // instance.interceptors.response.use(res => {
  //   // console.log(res);
  //   return res
  // }, err => {
  //   console.log(err);
  // })


  // 发送真正的网络请求
  // 因为axios实例对象就是promise对象
  return instance(config)
}

