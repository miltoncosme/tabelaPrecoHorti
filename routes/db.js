const conn = function(){
    return {
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    host: process.env.HOST_DB,
    database: process.env.PATH_DB,  
    lowercase_keys: false, // set to true to lowercase keys
    role: null,            // default
    pageSize: 4096,  
    port: 3050}
}

module.exports.conn = conn