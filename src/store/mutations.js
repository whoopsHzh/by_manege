import * as types from './mutations-types'
import {
  stat
} from 'fs'
import {
  type
} from 'os'

const matutions = {
  // 登录状态改变
  [types.LOGIN_SUCCESS] (state, data) {
    if (data) {
      state.token = data.token
      state.adminId = data.adminId
      state.adminName = data.adminName
      state.deptCode = data.deptCode
      localStorage.setItem('token', data.token)
    }
    else {
      state.token = ''
      state.adminId = ''
      state.adminName = ''
      state.deptCode = ''
      localStorage.removeItem('token');
    }
  },
  [types.SET_UPLOADDATA] (state, data) {
    state.upLoadData = data
  }
}

export default matutions
