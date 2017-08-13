var dbs = require('./db')

//session service
var Session = require('fiw-session')
var session = new Session(dbs.pool(), {
    //for kv
    table_name: 'app_session',

    //for session
    session_cache_size: 65536, //max number of session in cache
    session_cache_timeout: 900000,  //(ms) clear session objects which is not operated for a period of time from buffer, default 15 minutes
    session_cache_delay: 100,	//(ms) time delay for write session to persistent storage
    session_id_name: 'sessionID', //session id name
    session_id_path: '/'  //(api) request path to allocate session id, api_filter must have an id_path
  });

module.exports = session