const Router = require('koa-router');
const ssr = new Router();

ssr.prefix('/ssr')
ssr.get('/index1',(ctx,next)=>{
    ctx.body='ssrindex1'
})

ssr.get('/index2',(ctx,next)=>{
    ctx.body='ssrindex1'
})

module.exports={
    ssr
}

