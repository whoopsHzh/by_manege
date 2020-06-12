<template>
  <div class="performance-page">
    <div class="searchWarp">
      <DropDown @select='select'
                :tit="tit"
                :data="userDataArr"></DropDown>
      <div class="block">
        <el-date-picker v-model="monthData"
                        type="month"
                        @change="confirmTime"
                        value-format="yyyy-MM"
                        placeholder="选择月">
        </el-date-picker>
      </div>
    </div>
    <div class="warp"
         v-show="formData&&JSON.stringify(formData)!=='{}'"
         v-html="formData"
         v-loading="loading">
    </div>
    <div style="width:100%;font-zise:22rem;text-align:center;HEIGHT: 80%;
    line-height: 200px;"
         v-if="JSON.stringify(formData)=='{}'">
      <Strong>数据为空</Strong><i class="el-icon-document-delete"></i>
    </div>
    <el-button type="primary"
               size="medium"
               style="font-size: 1em;
    font-weight: 900;"
               round
               @click="saveFrom">保&nbsp;&nbsp;存</el-button>
  </div>
  </div>

</template>

<script>
import DropDown from 'common/DropDown'
import Upload from 'common/Upload'
import Vue from 'vue';
import { Loading } from 'element-ui';


import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      formData: null,
      loading: true,
      tit: '选择员工',
      monthData: '',//查询时间
      something: '',
      inputUpData: {},//input值容器
      titUpData: {},//tit值容器
      userDataArr: [],
      VueHandleMount: false,//是否挂载了vue dom
      id: '',//员工id
      name: '',//select当前选择的usernaem
    }
  },
  components: {
    DropDown,
    Upload
  },
  computed: {
    ...mapGetters({ _deptCode: 'deptCode', _adminId: 'adminId', _upLoadData: 'upLoadData' })
  },
  mounted () {
    this.queryAdminByDept(this._deptCode)//获取员工
    this.initMonth()// 初始化时间选择器当前时间
  },
  methods: {
    ...mapMutations({ _setFileUpData: 'SET_UPLOADDATA' }),
    // 保存
    saveFrom () {
      this.saveKpiTemplateItem()
    },
    // 保存表格
    saveKpiTemplateItem () {

      let loadingInstance1 = Loading.service({ fullscreen: true });

      let params = {}
      let that = this
      params.kpiTemplateItemDtos = this.inputUpData
      params.titleMap = this.titUpData
      params.fileDtoList = this._upLoadData
      params.staffAccountId = this.id
      params.time = this.monthData + '-01'

      this.$api.saveKpiTemplateItem(params).then(res => {

        if (res.status != 10000) {
          this.$message({            message: '保存失败',
            type: 'warning'          })
          this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance1.close();
          });
          return
        }
        this.$message({          message: '保存成功',
          type: 'success'        })
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance1.close();
        });
        // 成功就再请求请求渲染
        that.getKpiTemplateHtml(that._adminId, that.id)
      })
    },
    // 初始化时间选择器当前时间
    initMonth () {
      //默认上个月
      let date = new Date()
      let month = date.getMonth()
      let year = date.getFullYear()
      month = month < 10 ? '0' + month : month
      this.monthData = `${year}-${month}`
    },
    // 选择时间
    confirmTime () {
      this.select(this.name)
      console.log(this.monthData);
    },
    // 部门编号查询员工账号
    queryAdminByDept (partNum) {
      this.$api.queryAdminByDept(partNum).then(res => {
        this.userDataArr = res.data
        // 选择第一个select
        // this.tit = res.data[0].userName
        // this.select(res.data[0].userName)
      })
    },
    // 获取当前部门计算模板接口
    getKpiTemplateHtml (adminId, staffId) {
      let loadingInstance1 = Loading.service({ fullscreen: true });
      // reset data
      // 1-->inputUpData
      this.inputUpData = {}
      // 2-->fileUpData
      this._setFileUpData([])
      // post
      this.$api.getKpiTemplateHtml(adminId, staffId, this.monthData + '-01').then(res => {

        this.formData = res.data
        this.loading = false
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance1.close();
        });
        this.$nextTick(() => {
          this.pushInputdomChange()
        })
      }).catch(e => {
        this.$nextTick(() => {
          this.pushInputdomChange()
        })
      })
    },
    // 选择人员
    select (name) {
      let selectUser = this.userDataArr.filter(item => {
        this.name = name
        return item.userName == name
      })
      let { id } = selectUser[0]
      this.id = id
      console.log(id, name);

      this.getKpiTemplateHtml(this._adminId, id)
    },
    uploadDateFile (fileDate) {
      this.$api.uploadDateFile(fileDate).then(res => {
        console.log(res);
      })
    },
    // upload mount dom
    pushInputdomChange () {
      let that = this
      // upload btn event mount
      let upLoadFather = document.querySelectorAll('.btn-upload')
      upLoadFather.forEach((Element, index) => {
        // to mount Vue Compoments
        // change cls
        let upInput = Element.children[0]

        let key = upInput.getAttribute('data-type-btnevent')

        let myShowBox = Vue.extend(Upload)
        let showBoxInstance = new myShowBox({
          data () {
            return {
              key: key
            }
          },
        }).$mount(upInput);
      })


      // input onchange event mount
      let inputFather = document.querySelectorAll('.input-onchange')
      inputFather.forEach((Element, index) => {
        let input = Element.children[0]
        let domDec = input.getAttribute('data-table-dec')
        input.setAttribute('onkeypress', "if(value.length>11)value=value.slice(0,8)")
        input.setAttribute('type', 'number')
        // 遍历input数组，准备给后端 
        that.inputUpData[domDec] = input.value

        // event mount
        input.addEventListener('change', (e) => {
          let value = e.target.value
          this.inputChange(domDec, value)
        })
      })

      // get tit map to EndService
      let titFather = document.querySelectorAll('.tit-col')
      titFather.forEach((element, index) => {
        let dom = element.children[0]
        let value = dom.innerHTML
        let domDec = dom.getAttribute('data-tit')
        this.titUpData[domDec] = value
      });


    },
    // upload dataHandle
    inputUpDataHandle () {
      console.log(this.inputUpData);
    },
    // input onchange event callBack
    inputChange (key, value) {
      this.inputUpData[key] = value
      console.log(key, value);
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
.searchWarp {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
}
.block {
    margin-left: 20px;
}
.warp {
    width: 100%;
    margin-bottom: 10px;
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

