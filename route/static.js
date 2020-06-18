const Router = require('koa-router');
const str = new Router();


str.prefix('/static')
str.post('/page',async (ctx,next)=>{
    let {dataList} =  {...ctx.request.body}
    if(dataList){   
        ctx.redisServer.pushList(dataList)
    }
    ctx.body={
        code:200,
        message: '创建成功'
    }
})

str.get('/index2',(ctx,next)=>{
    ctx.body='staticindex1'
})

module.exports={
    str
}


