var express = require('express');
var router = express.Router();
var dbconnection = require('../lib/db');

//list all students at http://localhost:3000/students/list

router.get('/list/:message?', function(req, res,next) {
    const query="SELECT * FROM students";
    var fullUrl=req.protocol + '://' + req.get('host') + req.baseUrl;
    var indexUrl= req.protocol + '://' + req.get('host');
    console.log(req.query);
    dbconnection.query(query, function(err,rows){
           if(err){
            res.render('students', { title: 'Students - ERROR', students: '', message: req.params.message });
           }else{
            res.render('students', { title: 'Students', students:rows, message: req.params.message, url: fullUrl,home:indexUrl });
           }
    });
});

//Insert page

router.get('/add/', function(req, res, next) {
    var indexUrl= req.protocol + '://' + req.get('host');
    res.render('students_insert', { title: 'students - Add New', message:'', home:indexUrl });
});

// request to insert student data from form

router.post('/add', function(req, res, next) {
    console.log(req.body.dateOfBirth)
    const query = "INSERT INTO `students`(`first_name`, `last_name`,`dateOfBirth`,`tuitionFees`) VALUES('"+ req.body.firstName + "', '" + req.body.lastName + "', '" + req.body.dateOfBirth + "', '" + req.body.tuitionFees + "')";
    dbconnection.query(query, function(err, status) {
        
        if(err) {
            res.render("students_insert", { title: 'students - Add New', message: "Error inserting data to the database!" });
        } 
        
        else {
           
            res.redirect('/students/list/All OK!!!');
        }
        
    });
});



//Delete
router.get('/delete/:id', function(req, res, next) {
    var query = "DELETE FROM `students` WHERE `student_id` = ?";
    const Id = req.params.id;
    console.log(Id)
    console.log(query)
    dbconnection.execute(query, [Id], function(err, result, fields) {
        console.log(result)
        console.log(err)
        if(err) {
            
        } else {
            res.redirect('/students/list/student with id ' + Id + " is deleted!");        
        }
    });
});


// UPDATE
// show form with data
router.get('/edit/:id', function(req, res, next) {
    var indexUrl= req.protocol + '://' + req.get('host');
    const Id = req.params.id;
    var query = "SELECT * FROM `students` WHERE `student_id` = ?";
    dbconnection.execute(query, [Id], function(err, result, fields) {
        console.log(result[0]);
        let students = result[0];
        res.render('students_edit', { title: 'Edit Students', message:'',  students: students, home:indexUrl});
    });
});

// UPDATE 
// call router.post('/update/)
router.post('/update', function(req, res, next) {
    
    const query = "UPDATE `students` SET `first_name` = ?, `last_name` = ?,`dateOfBirth=?`,`tuitionFees=?`, WHERE `id` = ?;";
    dbconnection.execute(query, [req.body.first_name, req.body.last_name, req.body.dateOfBirth, req.body.tuitionFees], function(err, status) {
        if(err) {
            res.render('students_edit', { title: 'students - Edit', message:'Update failed! Check the values again!',  students: students});
        } else {
            res.redirect('/students/update/Book with id ' + req.body.student_id + " is updated!");
        }
    });
});






module.exports = router;