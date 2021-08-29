var express = require("express");
var router = express.Router();
var dbconnection = require("../lib/db");
const dateTime = require("date-and-time");

//GET LIST ALL COURSES at http://localhost:3000/courses/list
router.get("/list/:message?", function (req, res, next) {
  const query = "SELECT * FROM courses";

  var fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  var indexUrl = req.protocol + "://" + req.get("host");

  console.log(req.query);

  dbconnection.query(query, function (err, rows) {
    if (err) {
      res.render("courses", {
        title: "Courses - ERROR",
        courses: "",
        message: req.params.message,
      });
    } else {
      res.render("courses", {
        title: "Courses",
        courses: rows,
        message: req.params.message,
        url: fullUrl,
        home: indexUrl,
      });
    }
  });
});

//GET ADD PAGE
router.get("/add/", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/courses/list";
  console.log(req.get("host"));
  res.render("courses_insert", {
    title: "Add new course",
    message: "",
    back: indexUrl,
  });
});

// ADD NEW course
router.post("/add", function (req, res, next) {
  const query =
    "INSERT INTO `courses`(`title`, `stream`,`type`,`start_date`,`end_date`) VALUES('" +
    req.body.title +
    "', '" +
    req.body.stream +
    "', '" +
    req.body.type +
    "', '" +
    req.body.startingDate +
    "', '" +
    req.body.endingDate +
    "')";
  dbconnection.query(query, function (err, status) {
    // Error!!!
    if (err) {
      res.render("courses_insert", {
        title: "Add new course",
        message: "Error inserting data to the database!",
      });
    }
    // all ok
    else {
      res.redirect("/courses/list/All OK!!!");
    }
  });
});

//DELETE course
router.get("/delete/:id", function (req, res, next) {
  var query = "DELETE FROM `courses` WHERE `courses_id` = ?";
  const Id = req.params.id;

  dbconnection.execute(query, [Id], function (err, result, fields) {
    if (err) {
      res.render("courses", {
        title: "courses",
        message: "Error deleting data to the database!",
      });
    } else {
      res.redirect("/courses/list/course with id " + Id + " is deleted!");
    }
  });
});

// UPDATE

// FORM
router.get("/edit/:id", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/courses/list";
  const Id = req.params.id;

  var query = "SELECT * FROM `courses` WHERE `courses_id` = ?";

  dbconnection.execute(query, [Id], function (err, result, fields) {
    let courses = result[0];
    console.log(courses);
    courses.start_date = dateTime.format(courses.start_date, "YYYY-MM-DD");
    courses.end_date = dateTime.format(courses.end_date, "YYYY-MM-DD");
    console.log(courses);

    res.render("courses_edit", {
      title: "Edit courses",
      message: "",
      courses: courses,
      back: indexUrl,
    });
  });
});

//REPLACE
router.post("/update", function (req, res, next) {
  const course = {
    title: req.body.title,
    stream: req.body.stream,
    type: req.body.type,
    id: req.body.courses_id,
  };
  console.log(course);

  const query =
    "UPDATE `courses` SET `title` ='" +
    req.body.title +
    "', `stream` ='" +
    req.body.stream +
    "',`type`='" +
    req.body.type +
    "', `start_date` ='" +
    req.body.startingDate +
    "', `end_date` ='" +
    req.body.endingDate +
    "' WHERE `courses_id` ='" +
    req.body.courses_id +
    "';";

  dbconnection.query(query, function (err, status) {
    if (err) {
      console.log(query);
      res.render("courses_edit", {
        title: "courses - Edit",
        message: "Update failed! Check the values again!",
      });
    } else {
      res.redirect(
        "/courses/list/course with id " + req.body.courses_id + " is updated!"
      );
    }
  });
});

module.exports = router;
