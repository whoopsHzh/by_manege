/**
 * 接口域名的管理
 */
var src;
if (document.domain == 'ts.baoyitech.com.cn') { //阿里云测试服务器
  src = 'https://ts.baoyitech.com.cn/performance/';
  // src = 'http://192.168.1.166:9099/performance';
} else if (document.domain == 'mp.baoyitech.com.cn') { //正式服
  src = 'https://app.baoyitech.com.cn/performance/';
} else {
  src = 'http://192.168.1.166:8620/performance'; //杨衡 
  // src = 'https://app.baoyitech.com.cn/performance/';//正式
  // src = 'http://192.168.1.35:9090/car_server/'; ///杨衡 
  // src = 'http://192.168.2.101:9090/car_server/'; ///杨衡 
  // src = 'http://192.168.1.110:9090'; //庄鹏腾
  // src = 'http://192.168.1.21:9099/pingan/'; //曾令江
  // src = 'https://test.baoyitech.com.cn/car_server/';
  // src = 'http://192.168.1.40:9090/pingan/';
  // src = 'http://192.168.1.40:9090/pingan/'; //本地CCREATEORDER
  // src = 'http://192.168.1.28:9099/pingan/'; //黄华文
  // src = 'http://192.168.1.28:9099/pingan' //伟城
}


const base = {
  src, //接口地址,
}
export default base;
