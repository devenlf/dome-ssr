const Router = require('koa-router');
const upload = new Router();
const multer = require('koa-multer');
var storage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
      },
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
        cb(null,  (new Date()).getTime()+'.jpg');
     }
}); 
let uploadFile = multer({ storage: storage });

upload.prefix('/upload')
upload.post('/file-size',uploadFile.single('file'), async (ctx,next)=>{
    // 上传图片到oss
    
    ctx.body = {
        code: 200,
        data:{
        url: 'http://localhost:8088/public/uploads/'+ctx.req.file.filename,//返回文件名
        name: ctx.req.file.filename
        }
    }
})

module.exports={
    upload
}

