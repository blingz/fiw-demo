var vm = require('vm')
var http = require('http')
var path = require('path')

//modules
var fib_modules = `assert,base32,base64,base64vlq,bson,collection,console,
        coroutine,crypto,db,encoding,fs,gd,global,gui,hash,hex,http,iconv,
        io,json,mq,net,os,path,path_posix,path_win32,process,profiler,
        querystring,re,registry,ssl,test,timers,tty,url,util,uuid,vm,ws,
        xml,zip,zlib,zmq,events` //fibjs模块
var custom_modules = `fib-kv,fiw-config,fiw-db,fiw-session,fiw-router`    //第三方模块
var ms = (fib_modules + ',' + custom_modules).replace(/\s/g,'').split(',')

/**
 * 通过sandbox沙箱，加载web
 */
function load () {
  return new vm.SandBox({
        _version_: '0.1.0'
    }, function(name) {
      //load fibjs module
      if(ms.indexOf(name)>-1) {
        return require(name)
      }

      //hack web_loader for hot update
      if(name == 'web_loader') {  
        return loader
      }
      console.error(`add module [${name}] to web_loader.js ?`)
    }).require(path.join(__dirname, './web'), '')
}

/**
 * 热更新的时候，重新载入服务(hot update)
 */
function reload() {
  var router = load()
  if(router && server) {
    server.handler = router
  }
}

//http server
var server = null

/**
 * 启动http server
 * @param {*} port 端口 
 * @param {*} async 默认同步启动(挂起服务)，true=异步启动
 */
function run (port, async=false) {
  server = new http.Server(port, load())
  console.log('server is running in port:', port)
  if(async) {
    server.asyncRun()
  }else {
    server.run()
  }
}

var loader = {run, reload}
module.exports = loader