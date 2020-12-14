var express = require('express');
var router = express.Router();
const Pool = require('./exec');
require('dotenv-safe').config();
var pag = 0;

/* GET home page. */
router.get('/', function(req, res) {
  const pool = new Pool();  
  pool.query(`select count(*) from produto where inativo='A' and balanca='S'`)
    .then(con=>{
      let count = con[0].COUNT;
      let max = Math.ceil(count / 34);
      console.log('max', max);
      console.log('pag', pag);
      if (pag===max) {
        pag=1
        console.log('(pag=max)')        
      } else {
        pag = pag + 1;
      }
      let qry = `select cast(cod_produto as varchar(14) character set WIN1250)  cod_produto,
                  left(cast(descricao as varchar(100) character set WIN1250), 26) as descricao,
                  venda from produto where inativo='A' and balanca='S' order by descricao
                  rows ${(pag*34)-33} to 34*${pag}`;
      console.log(qry)
      return pool.query(qry);
    })  
    .then(con=>{     
      console.log(con)
      res.render('index', { title: 'Express', dados:con });
    })
    .catch(err=>{
      console.log(err.message)
      res.render('index', { title: 'Express', dados:[] });
    }) 
});

module.exports = router;
