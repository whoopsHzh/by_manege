<template>
  <div class="MeritDetail">
    <div class="warp"
         v-show="formData"
         v-html="formData">
    </div>
    <el-button type="primary"
               size="medium"
               style="width: 100%;font-size: 1.5em;
    font-weight: 900;"
               round
               @click="saveFrom">保存</el-button>
  </div>
</template>

<script>
import Upload from 'common/Upload'
import Vue from 'vue';

import { mapGetters, mapMutations } from 'vuex'

import { Loading } from 'element-ui';
export default {
  data () {
    return {
      formData: null,
      monthData: '',//查询时间
      inputUpData: {},//input值容器
      titUpData: {},//tit值容器
    }
  },
  mounted () {
    console.log(this.$route);
    this.initMonth()// 初始化时间
    this.getKpiTemplatePage()
  },
  computed: {
    ...mapGetters({ _upLoadData: 'upLoadData', _serialNumber: 'serialNumber', _userId: 'userId' })
  },
  methods: {
    ...mapMutations({ _setFileUpData: 'SET_UPLOADDATA' }),
    initMonth () {
      //默认上个月
      let date = new Date()
      let month = date.getMonth()
      let year = date.getFullYear()
      month = month < 10 ? '0' + month : month
      this.monthData = `${year}-${month}`
    },
    // 获取当前绩效详情
    getKpiTemplatePage () {
      let loadingInstance1 = Loading.service({ fullscreen: true });
      // reset data
      // 1-->inputUpData
      this.inputUpData = {}
      // 2-->fileUpData
      this._setFileUpData([])
      this.$api.getKpiTemplatePage(this._serialNumber).then(res => {
        this.formData = res.data
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance1.close();
        });
        this.$nextTick(() => {
          this.pushInputdomChange()
        })
      })
    },
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
      params.staffAccountId = this._userId
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
        that.getKpiTemplatePage()
      }).catch(e => {
        this.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance1.close();
        });
      })
    },
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
    // input onchange event callBack
    inputChange (key, value) {
      this.inputUpData[key] = value
      console.log(key, value);
    }
  },

}
</script>

<style>
.MeritDetail {
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