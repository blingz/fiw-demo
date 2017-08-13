//config模块优先初始化
//配置文件base只需要初始1次即可
//其他模块可以直接调用 require('fiw-config')('xxxx')
var config = require('fiw-config')({base:'../config'})

//log
console.add(config('console'))

//load web
var appConf = config('app')
let loader = require('./service/web_loader')
loader.run(appConf.server.port)
