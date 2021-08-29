var express = require("express");
var router = express.Router();
var dbconnection = require("../lib/db");
const dateTime = require("date-and-time");

//GET LIST ALL students at http://localhost:3000/students/list

router.get("/list/:message?", function (req, res, next) {
  const query = "SELECT * FROM students";
  var fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  var indexUrl = req.protocol + "://" + req.get("host");
  console.log(req.query);
  dbconnection.query(query, function (err, rows) {
    if (err) {
      res.render("students", {
        title: "Students - ERROR",
        students: "",
        message: req.params.message,
      });
    } else {
      res.render("students", {
        title: "Students",
        students: rows,
        message: req.params.message,
        url: fullUrl,
        home: indexUrl,
      });
    }
  });
});

//GET ADD PAGE

router.get("/add/", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host");
  res.render("students_insert", {
    title: "students - Add New",
    message: "",
    home: indexUrl,
  });
});

// ADD NEW

router.post("/add", function (req, res, next) {
  const query =
    "INSERT INTO `students`(`first_name`, `last_name`,`dateOfBirth`,`tuitionFees`) VALUES('" +
    req.body.firstName +
    "', '" +
    req.body.lastName +
    "', '" +
    req.body.dateOfBirth +
    "', '" +
    req.body.tuitionFees +
    "')";
  dbconnection.query(query, function (err, status) {
    if (err) {
      res.render("students_insert", {
        title: "students - Add New",
        message: "Error inserting data to the database!",
      });
    } else {
      res.redirect("/students/list/All OK!!!");
    }
  });
});

//Delete
router.get("/delete/:id", function (req, res, next) {
  var query = "DELETE FROM `students` WHERE `student_id` = ?";
  const Id = req.params.id;
  console.log(Id);
  console.log(query);
  dbconnection.execute(query, [Id], function (err, result, fields) {
    console.log(result);
    console.log(err);
    if (err) {
    } else {
      res.redirect("/students/list/student with id " + Id + " is deleted!");
    }
  });
});

// UPDATE

// FORM
router.get("/edit/:id", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host");
  const Id = req.params.id;

  var query = "SELECT * FROM `students` WHERE `student_id` = ?";

  dbconnection.execute(query, [Id], function (err, result, fields) {
    // console.log(result[0]);

    let students = result[0];
    //convert date to html input friendly format
    students.dateOfBirth = dateTime.format(students.dateOfBirth, "YYYY-MM-DD");

    console.log(students);

    res.render("students_edit", {
      title: "Edit Students",
      message: "",
      students: students,
      home: indexUrl,
    });
  });
});

//REPLACE
router.post("/update", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host");
  console.log(
    req.body.firstName,
    req.body.lastName,
    req.body.dateOfBirth,
    req.body.tuitionFees,
    req.body.students_id,
    typeof req.body.dateOfBirth
  );

  const student = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    tuitionFees: req.body.tuitionFees,
    id: req.body.students_id,
  };

  const query =
    "UPDATE `students` SET `first_name` ='" +
    req.body.firstName +
    "', `last_name` ='" +
    req.body.lastName +
    "',`dateOfBirth`='" +
    req.body.dateOfBirth +
    "',`tuitionFees`='" +
    req.body.tuitionFees +
    "' WHERE `student_id` ='" +
    req.body.students_id +
    "';";

  dbconnection.query(query, function (err, status) {
    if (err) {
      console.log(query);
      res.render("students_edit", {
        title: "students - Edit",
        message: "Update failed! Check the values again!",
        students: student,
        home: indexUrl,
      });
    } else {
      res.redirect(
        "/students/list/Student with id " +
          req.body.students_id +
          " is updated!"
      );
    }
  });
});

module.exports = router;
