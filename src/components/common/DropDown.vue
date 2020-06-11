<template>
  <div>
    <!-- <el-dropdown @command="handleCommand">
      <el-button type="primary">
        {{comTit}}<i class="el-icon-arrow-down el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(item, index) in data"
                          :key="item.id"
                          :command="item.userName">{{item.userName}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown> -->
    <el-select v-model="value"
               @change="handleCommand"
               filterable
               placeholder="请选择">
      <el-option v-for="item in data"
                 :key="item.id"
                 :label="item.userName"
                 :value="item.userName">
      </el-option>
    </el-select>
  </div>

</template>

<script>
export default {
  data () {
    return {
      selcedVualue: '',
      value: ''
    }
  },
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    tit: {
      type: String,
      default: '下拉菜单'
    }
  },

  methods: {
    // 下拉菜单
    handleCommand (command) {
      this.selcedVualue = command
      this.$emit('select', command);
    },
  },
}
</script>

<style >
.el-dropdown-link {
    cursor: pointer;
    color: #409eff;
}
.el-icon-arrow-down {
    font-size: 12px;
}
</style>