<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover"
                 class="mgb20"
                 style="height:252px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg"
                 class="user-avator"
                 alt />
            <div class="user-info-cont">
              <div class="user-info-name">{{_adminName}}</div>
              <div class="part">部门:{{_part}}</div>
            </div>
          </div>
          <div class="user-info-list">
            <!-- 上次登录时间： -->
            <!-- <span>2019-11-01</span> -->
          </div>
          <!-- <div class="user-info-list">
            上次登录地点：
            <span>东莞</span>
          </div> -->
        </el-card>
        <!-- <el-card shadow="hover" style="height:252px;">
                    <div slot="header" class="clearfix">
                        <span>语言详情</span>
                    </div>Vue
                    <el-progress :percentage="71.3" color="#42b983"></el-progress>JavaScript
                    <el-progress :percentage="24.1" color="#f1e05a"></el-progress>CSS
                    <el-progress :percentage="13.7"></el-progress>HTML
                    <el-progress :percentage="5.9" color="#f56c6c"></el-progress>
                </el-card> -->
      </el-col>
      <el-col :span="16">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">

      </el-col>
      <el-col :span="12">

      </el-col>
    </el-row>
  </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
import { mapMutations, mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  data () {
    return {
      name: localStorage.getItem('userId'),
    };
  },
  components: {
    Schart
  },
  computed: {
    ...mapGetters({ _adminName: 'adminName', _part: 'part' }),
    role () {
      return this.name === 'admin' ? '超级管理员' : '普通用户';
    }
  },

  methods: {

  }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 30px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}
.user-info-name {
    /* font-size: 3rem; */
}
.part {
    margin-top: 15px;
}
.schart {
    width: 100%;
    height: 300px;
}
</style>
