import axios from "axios";

export function request(config) {
  //   // 1.创建axios实列
  const instance =axios.create({
    baseURL:'http://152.136.185.210:7878/api/hy66',
    timeout:5000
  })
  //请求拦截作用
  instance.interceptors.request.use(config =>{
    // console.log(config);
    return config
  }),err =>{
    console.log(err);
  }
  //相应拦截,已经相应过了，将结果进行打印
  instance.interceptors.response.use(res =>{
    return res.data
  }),err =>{
    console.log(err);
  }
  //instance本身就是一个promise
  return instance(config)
}
