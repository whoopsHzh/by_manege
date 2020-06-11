import axios from 'axios'; // 引入axios
import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import router from 'router'; //引入router
import { Loading, Message } from 'element-ui';

import store from 'store';

// vant的toast提示框组件，大家可根据自己的ui组件更改。
// import {
//   Toast
// } from 'vant';

/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
// const tip = msg => {
//   toast({
//     message: msg,
//     duration: 1000,
//     forbidClick: true
//   });
// }
/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {

  router.replace({
    path: '/login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  });

  //假装你在跳转主页 
}

/** 
 * 请求失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // error: "Bad Request"
    case 400:
      // toast('Bad Request');
      break;
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      // toast('登录过期，请重新登录');
      // toast('登录过期，请重新登录');
      //    localStorage存储操作
      // localStorage.removeItem('token');//在vuex完成
      store.commit('loginSuccess', null);
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    // 404请求不存在
    case 404:
      Message({ message: '请求的资源不存在', type: 'error' });
      break;
    case 500:
      Message({ message: '请求的资源不存在', type: 'error' });
      break;
    default:
      if (other.includes('timeout')) {
        Message({ message: '链接超时', type: 'error' });
        return
      }
      // console.log(other)
      Message({ message: other, type: 'error' });
  }
}

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 12
});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.transformRequest = [function (data) {
  let ret = ''
  for (let it in data) {
    ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
  }
  return ret
}]
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */
instance.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
    const { token, adminId } = store.state;
    console.log('token', token, router.path);
    if (router.path != 'login') {
      token == '' && toLogin()
      adminId == '' && toLogin()
    }
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {

    Promise.error(error)
  }

)

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else Promise.reject(res.data)
  }

  ,
  // 请求失败
  error => {

    const {
      response
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围 
      errorHandle(response.status, response.data.message || response.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      if (!window.navigator.onLine) {
        // 断网了给store来一发
        // store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
