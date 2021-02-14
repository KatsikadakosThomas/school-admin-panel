var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

//lists all trainers at http://localhost:3000/trainers/list
router.get('/list/:message?', function(req, res,next) {
    const query="SELECT * FROM trainers";
    var fullUrl=req.protocol + '://' + req.get('host') + req.baseUrl;
    var indexUrl= req.protocol + '://' + req.get('host');
    console.log(indexUrl);
    dbconnection.query(query, function(err,rows){
           if(err){
            res.render('trainers', { title: 'Trainers - ERROR', trainers: '', message: req.params.message });
           }else{
            res.render('trainers', { title: 'Trainers', trainers:rows, message: req.params.message, url: fullUrl,home:indexUrl });
           }
    });
});

//Insert page
router.get('/add/', function(req, res, next) {
    var indexUrl= req.protocol + '://' + req.get('host');
    res.render('trainers_insert', { title: 'trainers - Add New', message:'',home:indexUrl });
});

// request to insert student data from form
router.post('/add', function(req, res, next) {
    
    const query = "INSERT INTO `trainers`(`first_name`, `last_name`,`subject`) VALUES('"+ req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.subject + "')";
    dbconnection.query(query, function(err, status) {

        // Error!!!
        if(err) {
            res.render("trainers_insert", { title: 'trainers - Add New', message: "Error inserting data to the database!" });
        } 
        // All OK!!!
        else {
           
            res.redirect('/trainers/list/All OK!!!');
        }
        
    });
});

module.exports = router;