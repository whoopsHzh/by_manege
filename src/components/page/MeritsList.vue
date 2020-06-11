<template>
  <div class="MeritsList">
    <div class="tableWarp">
      <el-table :data="tableData"
                style="width: 100%"
                min-height='80%'>
        <el-table-column fixed
                         prop="id"
                         label="员工Id"
                         width="150">
        </el-table-column>
        <el-table-column fixed
                         prop="userName"
                         label="员工名称"
                         width="150">
        </el-table-column>
        <el-table-column prop="deptName"
                         label="部门名称"
                         width="120">
        </el-table-column>
        <el-table-column prop="createTime"
                         label="创建时间"
                         width="120">
        </el-table-column>
        <el-table-column prop="kpiTime"
                         label="绩效月份"
                         width="120">
        </el-table-column>

        <el-table-column prop="totalKpiMoney"
                         label="绩效金额"
                         width="">
        </el-table-column>
        <!-- <el-table-column prop="serialNumber"
                         label="绩效流水号"
                         width="">
        </el-table-column> -->
        <el-table-column prop="totalBonusMoney"
                         label="提奖总金额"
                         width="">
        </el-table-column>
        <el-table-column prop="totolKpiScore"
                         label="绩效总分数"
                         width="300">
        </el-table-column>
        <el-table-column fixed="right"
                         label="操作"
                         width="120">
          <template slot-scope="scope">
            <el-button @click.native.prevent="check(scope.$index, tableData)"
                       type="text"
                       size="small">
              查看
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>
    <div class="paginationWarp">
      <el-pagination layout="prev, pager, next"
                     @current-change="handleCurrentChange"
                     :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  mounted () {
    this.uploadDateFile()
  },
  methods: {
    ...mapMutations({ _setUserId: 'SET_USERID', _setsSerialNumber: 'SET_SERIALNUMBER' }),

    //  切换 页面
    handleCurrentChange (val) {
      this.uploadDateFile(val)
    },
    //   获取列表
    uploadDateFile (page = 1) {
      this.$api.uploadDateFile(page).then(res => {

        console.log(res);
        this.$nextTick(() => {
          this.tableData = res.data.data
          this.total = res.data.iTotalRecords
        })
      })
    },
    deleteRow (index, rows) {
      this.$router.push({ path: `/meritDetail/${rows[index].serialNumber}` })
    },
    check (index, rows) {
      this._setUserId(rows[index].userId)
      this._setsSerialNumber(rows[index].serialNumber)
      this.$router.push({ path: `/meritDetail` })
    }
  },
  data () {
    return {
      tableData: [],
      total: 10
    }
  }
}
</script>


<style  scoped>
.MeritsList {
    height: 100%;
    position: relative;
}
.paginationWarp {
    /* height: 80%; */
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 10%;
}
</style>