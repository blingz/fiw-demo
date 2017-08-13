var router = require('fiw-router')()


//子路由的子路由  address: /test/x/y
var router2 = require('fiw-router')()
router2.use('*', function(r) {
  console.debug(`test2 address: ${r.address}, value: ${r.value}, params:`, JSON.stringify(r.params))
  r.response.write('test:' + r.address)
})
router.use('/x/y', router2)

//子路由  address: /test/123
router.use('/123', function(r) {
  console.debug(`test123 address: ${r.address}, value: ${r.value}, params:`, JSON.stringify(r.params))
  r.response.write('test:' + r.address)
})

//子路由 address: /test/opq
router.use('*', function(r) {
  console.debug(`test1 address: ${r.address}, value: ${r.value}, params:`, JSON.stringify(r.params))
  r.response.write('test:' + r.address)
})

module.exports = router