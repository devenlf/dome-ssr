const myEmitter = require('./event-config')
const FileSys = require('./fileCreate')
const OSSServer = require('./oss')

class redisEventClass{
    constructor(app){
        this.app = app;
        this.FileSystem =  new FileSys()
        this.OSSServer = new OSSServer()
        this.timer = 0
        //监听事件
        myEmitter.on('start-create',(type)=>{
            console.log(`事件类型: ${type}事件`)
            this.createEvent()
        })
    }
    //生成事件
    async createEvent(){
            this.timer = 0;
            let data = await this.app.context.redisServer.popList()
            if(!data) return
            let html = await this.FileSystem.findTemplate(data)
            this.uploadEvent(html)
     }
   
     //上传逻辑
     async uploadEvent(html){
      this.FileSystem.writeSever(html).then((res)=>{
        // 上传成功
        const {name} = res
        this.OSSServer.put(`home/ssr-text/${name}.html`,`./public/${name}.html`,()=>{
          this.createEvent()
        },()=>{
          //失败
          this.timer++
          if(this.timer>3){
            this.createEvent()
          }else{
            this.uploadEvent()
          }
        },{headers:{
          'Contnet-Type': 'text/html'
        }})
      })
     }
}
module.exports = redisEventClass