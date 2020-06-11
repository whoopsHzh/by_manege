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
      state.part = data.deptName
      localStorage.setItem('token', data.token)
    }
    else {
      state.token = ''
      state.adminId = ''
      state.adminName = ''
      state.deptCode = ''
      localStorage.removeItem('token');
      state.part = ''
    }
  },
  [types.SET_UPLOADDATA] (state, data) {
    state.upLoadData = data
  },
  [types.SET_USERID] (state, userId) {
    state.userId = userId
  },
  [types.SET_SERIALNUMBER] (state, serialNumber) {
    state.serialNumber = serialNumber
  },
  [types.SET_PART] (state, part) {
    state.part = part
  }


}

export default matutions
