const Koa = require('koa');
const {Route} = require('./route/index')
const staticServer = require('koa-static');
const RedisServer = require('./server/redis');
const redisEventClass = require('./server/event-redis')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const port = 8088;
const host = '0.0.0.0'; 

class Server{
    constructor(){
        this.app = new Koa();
        this.app.use(staticServer(__dirname,'public'))
        this.app.use(staticServer(__dirname,'client-server'))
        this.app.use(bodyParser())
        this.app.use(cors())
        this.app.use(Route.routes())
    }
    async start(){
        this.app.listen(port,host,()=>{
            console.log('服务开启成功')
            this.app.context.redisServer = new RedisServer()
            new redisEventClass(this.app)
        });
        this.app.on('error',(err)=>{
            console.log(err)
        })
    }
}

let serverClient = new Server()
serverClient.start()



