<template>
  <div class="performance-page">
    <DropDown @select='select'
              tit="选择员工"
              :data="userDataArr"></DropDown>
    <div class="warp"
         v-show="formData"
         v-html="formData"
         v-loading="loading">
    </div>
    <button @click="upDataHandle"
            class="el-button el-button--default el-button--small">上传资料</button>
    </td>
    <Upload></Upload>
  </div>
  </div>

</template>

<script>
import DropDown from 'common/DropDown'
import Upload from 'common/Upload'
import Vue from 'vue';

import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: null,
      loading: true,
      something: '',
      updata: {},
      userDataArr: [],
      VueHandleMount: false,//是否挂载了vue dom
    }
  },
  components: {
    DropDown,
    Upload
  },
  computed: {
    ...mapGetters({ _deptCode: 'deptCode', _adminId: 'adminId' })
  },
  mounted () {
    this.queryAdminByDept(this._deptCode)
  },
  methods: {
    // 部门编号查询员工账号
    queryAdminByDept (partNum) {
      this.$api.queryAdminByDept(partNum).then(res => {
        this.userDataArr = res.data
      })
    },
    // 获取当前部门计算模板接口
    getKpiTemplateHtml (adminId, staffId) {
      this.$api.getKpiTemplateHtml(adminId, staffId).then(res => {
        this.formData = res.data
        this.loading = false
        this.$nextTick(() => {
          this.pushInputdomChange()
        })
      })
    },
    // 选择人员
    select (name) {
      // reset updata
      this.updata = {}
      let selectUser = this.userDataArr.filter(item => {
        return item.userName == name
      })
      let { id } = selectUser[0]
      this.getKpiTemplateHtml(this._adminId, id)
    },
    uploadDateFile (fileDate) {
      this.$api.uploadDateFile(fileDate).then(res => {
        console.log(res);
      })
    },
    // upload mount dom
    pushInputdomChange () {
      // if (this.VueHandleMount) {
      //   return
      // }
      // else {
      let that = this
      // upload btn event mount
      let upLoadFather = document.querySelectorAll('.btn-upload')
      upLoadFather.forEach((Element, index) => {
        // to mount Vue Compoments
        // change cls
        let upInput = Element.children[0]

        let key = upInput.getAttribute('data-type-btnevent')
        console.log('upInputkey', key);

        let myShowBox = Vue.extend(Upload)
        let showBoxInstance = new myShowBox({
          data () {
            return {
              key: key
            }
          },
        }).$mount(upInput);
      })
      // }

      // input onchange event mount
      let inputFather = document.querySelectorAll('.input-onchange')
      inputFather.forEach((Element, index) => {
        let input = Element.children[0]
        input.addEventListener('change', (e) => {
          let domDec = input.getAttribute('data-table-dec')
          let value = e.target.value
          this.inputChange(domDec, value)
        })
      })
    },
    // upload dataHandle
    upDataHandle () {
      console.log(this.updata);
    },
    // input onchange event callBack
    inputChange (key, value) {
      console.log(key, value);
      this.updata[key] = value
    }
  }
}
</script>


<style scoped>
.performance-page {
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
}
.warp {
    width: 100%;
}
.mystyle {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer;
}
</style>

