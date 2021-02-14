const express = require('express');
const router = express.Router();



/* GET home page. */
router.get('/', function(req, res, next) {
  var fullUrl=req.protocol + '://' + req.get('host')+ req.baseUrl;
  var indexUrl= req.protocol + '://' + req.get('host');
  
  res.render('index', { title: 'School List', url: fullUrl,home:indexUrl });
});







module.exports = router;
