<template>
<el-row type="flex" justify="center">
<el-col :span="12">
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="图片上传">
    <el-upload
    class="upload-demo"
    action="http://localhost:8088/upload/file-size/"
    :on-success="successUpdata"
    :before-upload="isCanUpload"
    :file-list="form.fileList">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form-item>
  <el-form-item label="上传时间">
    <el-col :span="11">
      <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item label="文案">
    <el-input type="textarea" v-model="form.desc"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">立即创建</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
</el-col>
</el-row>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          date1: '',
          date2: '',
          desc: '',
          fileList:[]
        }
      }
    },
    methods: {
      onSubmit() {
       this.$axios.post('http://localhost:8088/static/page', {
                dataList: this.form
            }).then((response) => {
                console.log(response)
            }).catch((error) => {
                console.log(error)
            })
        console.log('submit!');
      },
      successUpdata(response){
          let files ={}
          let {data} = response
          let fileData  = { ...data }
          this.form.fileList.push(fileData)
      },
      isCanUpload(file){
          console.log(file)
      }
    }
  }
  </script>
  <style>
  .el-form-item__content{
      text-align: left;
  }
  </style>
  