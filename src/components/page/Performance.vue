<template>
  <div class="performance-page">
    <DropDown @select='select'
              tit="选择员工"
              :data="dataArr"></DropDown>
    <div class="warp"
         v-show="formData"
         v-html="formData"
         v-loading="loading">
    </div>
    <button @click="upDataHandle"
            class="el-button el-button--default el-button--small">上传资料</button>
    </td>

  </div>
  </div>

</template>

<script>
import DropDown from 'common/DropDown'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      formData: null,
      loading: true,
      something: '',
      updata: {},
      dataArr: []
    }
  },
  components: {
    DropDown
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
        this.dataArr = res.data
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
    select (staffId) {
      // reset updata
      this.updata = {}
      this.getKpiTemplateHtml(this._adminId, staffId)
    },
    uploadDateFile (fileDate) {
      this.$api.uploadDateFile(fileDate).then(res => {
        console.log(res);
      })
    },
    pushInputdomChange () {
      // upload btn event mount
      let upLoadFather = document.querySelectorAll('.btn-upload')
      upLoadFather.forEach((Element, index) => {
        // change cls
        let btn = Element.children[0]

        btn.setAttribute('class', 'el-button')
        // add changeEvent
        // onchange="handleFile()"
        btn.addEventListener('change', (e) => {
          var oFile = e.target.files[0];
          let formData = new FormData();
          formData.append('fileDate', oFile);
          let config = {
            //添加请求头
            headers: { "Content-Type": "multipart/form-data" },
            //添加上传进度监听事件
            onUploadProgress: e => {
              var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
              this.progress = completeProgress;
            }
          };
          this.$axios.post('http://192.168.1.166:9099/performance/file/uploadDateFile', formData, config).then(
            function (response) { console.log(response); })
            .catch(function (error) {
              console.log(error);
            });
          // this.uploadDateFile(formData)
        })
      })

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

