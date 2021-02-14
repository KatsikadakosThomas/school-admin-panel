var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

//lists all assignments at http://localhost:3000/assignments/list
router.get('/list/:message?', function(req, res,next) {
    const query="SELECT * FROM assignment";
    var fullUrl=req.protocol + '://' + req.get('host') + req.baseUrl;
    var indexUrl= req.protocol + '://' + req.get('host');
    console.log(req.query);
    dbconnection.query(query, function(err,rows){
           if(err){
            res.render('assignments', { title: 'Assignments - ERROR', assignment: '', message: req.params.message });
           }else{
            res.render('assignments', { title: 'Assignments', assignment:rows, message: req.params.message, url: fullUrl,home:indexUrl });
           }
    });
});

module.exports = router;