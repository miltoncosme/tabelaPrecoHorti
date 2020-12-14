var express = require('express');
var router = express.Router();
const Pool = require('./exec');
require('dotenv-safe').config();

/* GET home page. */
router.get('/', function(req, res) {
  const pool = new Pool();
  pool.query(`select cast(cod_produto as varchar(14) character set WIN1250)  cod_produto,
              left(cast(descricao as varchar(100) character set WIN1250), 26) as descricao,
              venda from produto where inativo='A' and balanca='S' order by descricao`)
        .then(con=>{     
          console.log(con)
          res.render('index', { title: 'Express', dados:con});
        })
        .catch(err=>{
          console.log(err.message)
          res.render('index', { title: 'Express', dados:[] });
        }) 
});

module.exports = router;
