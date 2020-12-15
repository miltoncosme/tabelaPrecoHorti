var express = require('express');
var router = express.Router();
const Pool = require('./exec');
require('dotenv-safe').config();
const iTam = 12;

/* GET home page. */
router.get('/', function(req, res) {
  const pool = new Pool();  
  var max;
  var filter="";
  if (process.env.FILTER_GRUPO>0){
    filter= ` and cod_grupo=${process.env.FILTER_GRUPO} `
  }
  if(req.session.pag) {
    //
  } else {
    req.session.pag=0;
  }
  pool.query(`select count(*) from produto where inativo='A' and balanca='S' ${filter}`)
    .then(con=>{
      let count = con[0].COUNT;
      max = Math.ceil(count / iTam);
      console.log('max', max);
      console.log('req.session.pag', req.session.pag);
      if (req.session.pag===max) {
        req.session.pag=1
        console.log('(req.session.pag=max)')        
      } else {
        ++req.session.pag;
      }
      let qry = `select cast(cod_produto as varchar(14)) cod_produto,
                  left(cast(descricao as varchar(100) character set WIN1252), 26) as descricao,
                  venda from produto where inativo='A' and balanca='S'  ${filter} order by descricao
                  rows ${(req.session.pag*iTam)-(iTam-1)} to ${iTam*req.session.pag}`;
      console.log(qry)
      return pool.query(qry);
    })  
    .then(con=>{     
      console.log(con)
      res.render('index', { title: 'Express', dados:con, pag:req.session.pag, max });
    })
    .catch(err=>{
      console.log(err.message)
      res.render('index', { title: 'Express', dados:[] });
    }) 
});

module.exports = router;
