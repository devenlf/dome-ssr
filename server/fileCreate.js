const template = require('art-template');
const path =require('path');
const fs = require('fs')

class FileSys{
    async findTemplate(data){
        console.log(data)
         let html = await template(path.join(__dirname,'../views/middlePage/index'), {
            info:data
        });
        return html
    }
    writeSever(html){
        console.log('开始生成文件...')
        return new Promise((resolve,reject)=>{
            let version = (new Date()).getTime()
            fs.writeFile(path.join(__dirname,`../public/text${version}.html`),html,(err)=>{
                if(err){
                    console.log('生成失败')
                    reject(0)
                    throw err
                }else{
                    console.log('生成成功')
                    resolve({
                      status:200,
                      name:`text${version}`
                    })
                }
            })
        })
    }
}

module.exports = FileSys