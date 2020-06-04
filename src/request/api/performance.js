

import base from './base'; // 导入接口域名列表
import api from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const performance = {
  // 登录
  login (params) {
    let { loginAccount, password } = params
    return api.post(`${base.src}/login`, {
      loginAccount, password, Loading: 'true'
    })
  },
  // 获取当前部门计算模板接口
  getKpiTemplateHtml (adminId) {
    return api.post(`${base.src}/weichatApi/kpi/getKpiTemplateHtml`, {
      adminId, Loading: 'true'
    })
  }
}


export default performance;
