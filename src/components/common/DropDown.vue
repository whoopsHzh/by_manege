<template>
  <el-dropdown @command="handleCommand">
    <el-button type="primary">
      {{tit}}<i class="el-icon-arrow-down el-icon--right"></i>
    </el-button>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item v-for="(item, index) in data"
                        :key="item.id"
                        :command="item.id">{{item.userName}}</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
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