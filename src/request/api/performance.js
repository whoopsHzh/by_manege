

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
  getKpiTemplateHtml (adminId, staffId, time) {
    return api.post(`${base.src}/weichatApi/kpi/getKpiTemplateHtml`, {
      adminId, staffId, time, Loading: 'true'
    })
  },
  // 部门编号查询员工账号
  queryAdminByDept (deptCode) {
    return api.post(`${base.src}/weichatApi/admin/queryAdminByDept`, {
      deptCode
    })
  },
  // 上传文件接口
  uploadDateFile (file) {
    return api.post(`${base.src}/file/uploadDateFile`, {
      file
    })
  },
  // 保存表格
  saveKpiTemplateItem (params) {
    const { kpiTemplateItemDtos, time, staffAccountId, titleMap, fileDtoList } = params
    return api.post(`${base.src}/weichatApi/kpi/saveKpiTemplateItem`, {
      staffAccountId,
      time,
      kpiTemplateItemDtos: JSON.stringify(kpiTemplateItemDtos),

      staffAccountId,
      titleMap: JSON.stringify(titleMap),
      fileDtoList: JSON.stringify(fileDtoList)
    }
    )
  },
  // 绩效列表
  uploadDateFile (page) {
    return api.post(`${base.src}/web/kpi/queryForList`, {
      page
    })
  },
  // 绩效详情
  getKpiTemplatePage (serialNumber) {
    return api.post(`${base.src}/weichatApi/kpi/getKpiTemplatePage`, {
      serialNumber
    })
  },
}

export default performance;