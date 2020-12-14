const firebird = require('node-firebird');
const { conn } = require('./db');

class Pool {
    

    query(qry){
        return new Promise((resolver, rejeitar) => {
            try {
              this.pool = firebird.pool(5, conn());          
            } catch (err) {
              rejeitar(err);
              return;              
            }          
            this.pool.get((err, db) => {
              if (err) {
                rejeitar(err);
                return;
              };        
              db.query(qry, (err, result) => {
                if (err) {
                  rejeitar(err);
                  return;
                }
        
                db.detach();
                resolver(result);
              });
            });
        });        
    }   
};

module.exports = Pool;