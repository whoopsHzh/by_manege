<template>
  <div :class="key">
    <a href="#"
       class="file">上传资料<input type="file"
             @change="change">
    </a>
    <div class="showUploadFileWarp">
      <div v-for="(item, index) in fileArr"
           :key="index">{{item.fileName}}&nbsp;&nbsp;<i @click="deleteFile(index)"
           class="el-icon-lx-roundclose"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Loading } from 'element-ui';
export default {
  data () {
    return {
      fileName: '',
      fileId: '',
      fileArr: [],
      key: ''
    }
  },
  mounted () {


  },
  computed: {
    ...mapGetters({ _upLoadData: 'upLoadData' })
  },
  methods: {
    deleteFile (index) {
      let deleteFile = this.fileArr[index]
      this.fileArr.splice(index, 1)

      //   vuex中去删除
      let temp_upLoadData = this._upLoadData.slice()
      console.log('temp_upLoadData', temp_upLoadData);

      let newtemp_upLoadData = temp_upLoadData.filter(item => {
        return item != deleteFile
      })
      this._setUpLoadData(newtemp_upLoadData);
    },
    ...mapMutations({ _setUpLoadData: 'SET_UPLOADDATA' }),
    change (e) {
      let that = this

      let oFile = e.target.files[0];
      let formData = new FormData();
      formData.append('file', oFile);
      let loadingInstance1 = Loading.service({ fullscreen: true });
      let config = {
        //添加请求头
        headers: { "Content-Type": "multipart/form-data" },
        //添加上传进度监听事件
        onUploadProgress: e => {
          var completeProgress = ((e.loaded / e.total * 100) | 0) + "%";
          this.progress = completeProgress;
        }
      };

      this.$axios.post(`${this.$api.base.src}/file/uploadDateFile`, formData, config).then(
        function (response) {
          let key = that.key
          let fileObj = {
            itemCode: key,
            uploadFileId: response.data.data.id,
            fileUrl: response.data.data.url,
            key,
            id: response.data.data.id,
            fileName: oFile.name
          }
          let setData = that._upLoadData.concat(fileObj)
          //   save the comData
          that.fileArr.push(fileObj)
          //   save the vue
          that._setUpLoadData(setData)
          // loding
          that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance1.close();
          });
        })
        .catch(function (error) {
          that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            loadingInstance1.close();
          });
        });

    }
  },
}
</script>

<style>
.file {
    position: relative;
    display: inline-block;
    background: #d0eeff;
    border: 1px solid #99d3f5;
    border-radius: 4px;
    padding: 4px 12px;
    overflow: hidden;
    color: #1e88c7;
    text-decoration: none;
    text-indent: 0;
    line-height: 10px;
    text-align: center;
}
.file input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
}
.file:hover {
    background: #aadffd;
    border-color: #78c3f3;
    color: #004974;
    text-decoration: none;
}
</style>