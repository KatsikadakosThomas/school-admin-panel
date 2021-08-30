var express = require("express");
var router = express.Router();
var dbconnection = require("../lib/db");
const dateTime = require("date-and-time");

//GET LIST ALL assignments at http://localhost:3000/assignments/list
router.get("/list/:message?", function (req, res, next) {
  const query = "SELECT * FROM assignment";
  var fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  var indexUrl = req.protocol + "://" + req.get("host");

  dbconnection.query(query, function (err, rows) {
    if (err) {
      res.render("assignment", {
        title: "Assignments - ERROR",
        assignment: "",
        message: req.params.message,
      });
    } else {
      res.render("assignment", {
        title: "Assignments",
        assignment: rows,
        message: req.params.message,
        url: fullUrl,
        home: indexUrl,
      });
    }
  });
});

//GET ADD PAGE
router.get("/add/", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/assignments/list";

  res.render("assignment_insert", {
    title: "Add new assignment",
    message: "",
    back: indexUrl,
  });
});

// ADD NEW assignment
router.post("/add", function (req, res, next) {
  const query =
    "INSERT INTO `assignment`(`title`, `description`,`type`,`oralMark`,`totalMark`,`subDateTime`) VALUES('" +
    req.body.title +
    "', '" +
    req.body.description +
    "', '" +
    req.body.type +
    "', '" +
    req.body.oralMark +
    "', '" +
    req.body.totalMark +
    "', '" +
    req.body.subDateTime +
    "')";
  dbconnection.query(query, function (err, status) {
    // Error!!!
    if (err) {
      res.render("assignment_insert", {
        title: "Add new assignment",
        message: "Error inserting data to the database!",
      });
    }
    // all ok
    else {
      res.redirect("/assignments/list/All OK!!!");
    }
  });
});

//DELETE assignment
router.get("/delete/:id", function (req, res, next) {
  var query = "DELETE FROM `assignment` WHERE `assignment_id` = ?";
  const Id = req.params.id;

  dbconnection.execute(query, [Id], function (err, result, fields) {
    if (err) {
      res.render("assignment", {
        title: "assignment",
        message: "Error deleting data to the database!",
      });
    } else {
      res.redirect(
        "/assignments/list/assignment with id " + Id + " is deleted!"
      );
    }
  });
});

// UPDATE

// FORM
router.get("/edit/:id", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/assignments/list";
  const Id = req.params.id;

  var query = "SELECT * FROM `assignment` WHERE `assignment_id` = ?";

  dbconnection.execute(query, [Id], function (err, result, fields) {
    let assignment = result[0];

    assignment.subDateTime = dateTime.format(
      assignment.subDateTime,
      "YYYY-MM-DD"
    );

    res.render("assignment_edit", {
      title: "Edit assignments",
      message: "",
      assignment: assignment,
      back: indexUrl,
    });
  });
});

//REPLACE
router.post("/update", function (req, res, next) {
  const assignment = {
    title: req.body.title,
    description: req.body.description,
    type: req.body.type,
    oralMark: req.body.oralMark,
    totalMark: req.body.totalMark,
    subDateTime: req.body.subDateTime,
    id: req.body.assignment_id,
  };

  const query =
    "UPDATE `assignment` SET `title` ='" +
    req.body.title +
    "', `description` ='" +
    req.body.description +
    "',`type`='" +
    req.body.type +
    "', `oralMark` ='" +
    req.body.oralMark +
    "', `totalMark` ='" +
    req.body.totalMark +
    "', `subDateTime` ='" +
    req.body.subDateTime +
    "' WHERE `assignment_id` ='" +
    req.body.assignment_id +
    "';";

  dbconnection.query(query, function (err, status) {
    if (err) {
      res.render("assignment_edit", {
        title: "assignment - Edit",
        message: "Update failed! Check the values again!",
      });
    } else {
      res.redirect(
        "/assignments/list/assignment with id " +
          req.body.assignment_id +
          " is updated!"
      );
    }
  });
});

module.exports = router;
