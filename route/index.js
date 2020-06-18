const Router = require('koa-router');
const Route = new Router();
const {ssr} = require('./ssr')
const {str} = require('./static')
const {upload} = require('./upload')

Route.use(ssr.routes())
Route.use(str.routes())
Route.use(upload.routes())

module.exports={
    Route
}