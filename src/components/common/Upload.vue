<template>
  <div>
    <a href="#"
       class="file">上传资料<input type="file"
             @change="change">
    </a>
    {{key}}
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileName: '',
      fileId: '',
      key: ''
    }
  },
  methods: {
    change (e) {
      let that = this
      let oFile = e.target.files[0];
      console.log('oFile', oFile.name);

      let formData = new FormData();
      formData.append('file', oFile);
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
        function (response) {
          console.log(response);
          that.fileId = response.data.id
          that.fileName = oFile.name
        })
        .catch(function (error) {
          console.log(error);
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