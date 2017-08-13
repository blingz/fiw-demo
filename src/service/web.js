var router = require('fiw-router')()

console.debug('load web ...')

//第一个filter(chain)
router.use(function(r) {
  console.debug('req', r.address)

  //end favicon.ico request
  if(r.address.indexOf('favicon.ico') > 0) {
    r.end()
  }
  
  //check xhr (ajax)
  r.xhr = false
  var xhr = r.firstHeader('HTTP_X_REQUESTED_WITH') || r.firstHeader('X-Requested-With')
  if(xhr && xhr.toLowerCase()=='xmlhttprequest') {
    r.xhr = true
  }

  //read ip from header
  r.ip = r.firstHeader('X-Real-IP') || ''
})

/**
 * session filter(chain)
 */
var session = require('./session')
router.use(r => {
  //filter
  session.cookie_filter(r)

  //update session
  console.debug('user:', JSON.stringify(r.session.user))
  r.session.user = {uid: 123, time: Date.now()}
})

/**
 * 热更新(hot update)
 */
router.use('^/reload$', function(r) {
  // 调用require('./web_loader') 热更新不生效
  // 采用require('web_loader')即可
  require('web_loader').reload()
  r.response.write('reload ok!')
})

/**
 * 1，修改 test-hot-update.js 
 * 2，请求address:  /reload 触发重新热加载
 * 3，再次访问adress: /test-host-update 则内容有变化
 */
router.use('^/test-hot-update$', function(r) {
  var test = require('../test/test-hot-update')
  r.response.write('test-hot-update:' + test(100))
})

//加载子路由
router.use('^/test(/.*)$', require('../test/web'))

//首页302跳转
router.use('^/$', r => {
  r.response.redirect('/index.html')
})

//静态文件
var http = require('http')
var path = require('path')
router.use('^(.*)$', http.fileHandler(path.join(__dirname, '../../web')))

module.exports = router