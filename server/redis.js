var redis  = require("redis");
const event = require('./event-config')

class RedisServer{
    constructor(){
        this.listKey = 'list:key' 
        this.createdServer();
        this.beginSubscribeSever();
    }

    //发布redis服务
    createdServer(){
        this.channel  = `${(new Date()).getTime()}channel`
        this.client = redis.createClient()
        this.client.on('connect',()=>{
            console.log('发布服务器开启')
        })
    }

    //开始订阅生成订阅服务
    async beginSubscribeSever(){
        this.clientSub = redis.createClient()
        let count = await this.getLlen()
        console.log(count)
        if(count>0){
            console.log('reids中存在数据，开始生成服务')
            this.emit("message");
        }else{
            this.subscribe()
        }
        
        this.clientSub.on("message",(channel,msg)=>{
            console.log(msg)
            this.unsubscribe();
            this.emit("message");
        })
    }

    //队列入栈
    pushList(listData,type="lpush"){
        new Promise((resolve,reject)=>{
            return this.client[type](this.listKey,JSON.stringify(listData),(err,res)=>{
                if(err){
                    console.log(err)
                    reject(err)
                }else{
                    this.publish()
                    resolve(res)
                }
            })
        })
    }

    //队列出栈
    popList(){
        return new Promise((resolve,reject)=>{
            return this.client.rpop(this.listKey,(err,res)=>{
                if(err){
                    reject(err)
                }else{
                    if(res){
                        resolve(JSON.parse(res))
                    }else{
                        resolve(0)
                        this.subscribe()
                    }
                }
            })
        })
    }

    //发布
    publish(channel=this.channel,msg=`开始干活了`){
        this.client.publish(channel,msg)
    }
    //订阅
    subscribe(channel=this.channel){
        this.clientSub.subscribe(channel)
    }
    //取消订阅
    unsubscribe(channel=this.channel){
        this.clientSub.unsubscribe()
    }


// 获取长度
  getLlen() {
    return new Promise((resolve, reject) => {
      this.client.llen(this.listKey, (err, res) => {
        // 如果没错 并且数据开启订阅
        if (!err && res < 1) {
          resolve(0);
        } else {
          resolve(res);
        }
      });
    });
  }

//emit
emit(type){
    event.emit('start-create',type)
}
}

module.exports = RedisServer

