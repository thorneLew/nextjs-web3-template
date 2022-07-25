import axios from 'axios'

function createFetch (options?: any) {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    // timeout: 8000,
    ...options
  });
  
  
  // 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    const JWT = localStorage?.getItem('token')
    const headers = {
      ...config.headers
    }
    
    if (JWT) {
      headers.Authorization = 'Bearer ' + JWT
    }
   
    config.headers = headers as any
  
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  
  // 添加响应拦截器
  instance.interceptors.response.use(function (response) {
      if(response.status === 200) {
        return response.data
      }

      return response;
    }, function (error) {
      if (error?.response?.status === 401) {
        const data = {
            code: 401,
            message: 'Token is expired'
        }
        return Promise.reject(data)
      }

      return Promise.reject(error);
  });

  return instance
}

const defaultFetch = createFetch()

export const fetch = createFetch({baseURL: ''})

export default defaultFetch