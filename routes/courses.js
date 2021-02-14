var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

//lists all courses at http://localhost:3000/courses/list
router.get('/list/:message?', function(req, res,next) {
    const query="SELECT * FROM courses";

    var fullUrl=req.protocol + '://' + req.get('host') + req.baseUrl;
    var indexUrl= req.protocol + '://' + req.get('host');

    console.log(req.query);

    dbconnection.query(query, function(err,rows){
           if(err){
            res.render('courses', { title: 'Courses - ERROR', courses: '', message: req.params.message });
           }else{
            res.render('courses', { title: 'Courses', courses:rows, message: req.params.message, url: fullUrl,home:indexUrl });
           }
    });
});

module.exports = router;