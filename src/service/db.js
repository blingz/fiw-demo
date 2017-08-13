var config = require('fiw-config')

//database service
var db = require('db')
var dbConf = config('db')
var dbs = require('fiw-db')('db', {
    create: () => {
        return db.open(dbConf.url)
    },
    timeout: dbConf.timeout || 30 * 1000,
    retry: 3
  })

module.exports = dbs