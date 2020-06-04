<template>
  <div class="performance-page">
    <div class="warp"
         v-show="formData"
         v-html="formData"
         v-loading="loading">
    </div>
    <el-button slot="prepend"
               icon="el-icon-lx-people"></el-button>
    <td class="style_09"
        style="display:flex">
      <input style="width: 100%;"
             type="text"
             data-table-dec="unqualifiedDTotal"
             value="15">
      <button class="el-button el-button--default el-button--small">上传资料</button>
    </td>

  </div>
  </div>

</template>

<script>
export default {
  data () {
    return {
      formData: null,
      loading: true,
      something: '',
    }
  },
  mounted () {
    // this.$loading()
    this.$api.getKpiTemplateHtml(localStorage.getItem('userId')).then(res => {
      console.log(res);
      this.formData = res.data
      this.loading = false
      this.pushInputdomChange()
    })
  },
  methods: {
    pushInputdomChange () {
      let txt = document.querySelectorAll('.style_10')
      txt.forEach((Element, index) => {
        console.log('txt', txt);

        // let input = document.createElement('input')
        // input.setAttribute("id", `input${index}`)
        // Element.appendChild(input)
      })
    },
  }
}
</script>


<style scoped>
.performance-page {
    display: flex;
    /* justify-content: center;
    align-items: center; */
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #f3f3f3;
    box-sizing: border-box;
}
.warp {
    width: 100%;
}
</style>
