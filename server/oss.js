const co = require('co');
const OSS = require('ali-oss');

class OSSServer {
  constructor(){
    this.client = new OSS({
      region: 'oss-cn-beijing',
      accessKeyId:'********************',
      accessKeySecret:'********************',
      bucket: '*****'
  });
  }
  show=()=>{
    this.client.list({prefix:'home/ssr-text/',delimiter:'/'}).then(result=>{
      console.log(result.objects)
    })
  }
  
  put=(olderFile,file,successFunction=()=>{},errFunction=()=>{},options)=>{
    this.client.put(olderFile,file,{...options}).then((result)=>{
      const {res} = result
      if(res.status === 200){ 
        successFunction()
        console.log('上传成功')
      }else{
        errFunction()
        console.log('上传失败')
      }
    })
  }
}

module.exports = OSSServer

