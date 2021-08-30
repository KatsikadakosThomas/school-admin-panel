var express = require("express");
var router = express.Router();
var dbconnection = require("../lib/db");

//GET LIST ALL TRAINERS at http://localhost:3000/trainers/list
router.get("/list/:message?", function (req, res, next) {
  const query = "SELECT * FROM trainers";
  var fullUrl = req.protocol + "://" + req.get("host") + req.baseUrl;
  var indexUrl = req.protocol + "://" + req.get("host");
  console.log(indexUrl);
  dbconnection.query(query, function (err, rows) {
    if (err) {
      res.render("trainers", {
        title: "Trainers - ERROR",
        trainers: "",
        message: req.params.message,
      });
    } else {
      res.render("trainers", {
        title: "Trainers",
        trainers: rows,
        message: req.params.message,
        url: fullUrl,
        home: indexUrl,
      });
    }
  });
});

//GET ADD PAGE
router.get("/add/", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/trainers/list";

  res.render("trainers_insert", {
    title: "Add new trainer",
    message: "",
    back: indexUrl,
  });
});

// ADD NEW TRAINER
router.post("/add", function (req, res, next) {
  const query =
    "INSERT INTO `trainers`(`first_name`, `last_name`,`subject`) VALUES('" +
    req.body.firstName +
    "', '" +
    req.body.lastName +
    "', '" +
    req.body.subject +
    "')";
  dbconnection.query(query, function (err, status) {
    // Error!!!
    if (err) {
      res.render("trainers_insert", {
        title: "Add new trainer",
        message: "Error inserting data to the database!",
      });
    }
    // all ok
    else {
      res.redirect("/trainers/list/All OK!!!");
    }
  });
});

//DELETE TRAINER
router.get("/delete/:id", function (req, res, next) {
  var query = "DELETE FROM `trainers` WHERE `trainer_id` = ?";
  const Id = req.params.id;

  dbconnection.execute(query, [Id], function (err, result, fields) {
    if (err) {
      res.render("trainers", {
        title: "trainers",
        message: "Error deleting data to the database!",
      });
    } else {
      res.redirect("/trainers/list/trainer with id " + Id + " is deleted!");
    }
  });
});

// UPDATE

// FORM
router.get("/edit/:id", function (req, res, next) {
  var indexUrl = req.protocol + "://" + req.get("host") + "/trainers/list";
  const Id = req.params.id;

  var query = "SELECT * FROM `trainers` WHERE `trainer_id` = ?";

  dbconnection.execute(query, [Id], function (err, result, fields) {
    let trainers = result[0];

    res.render("trainers_edit", {
      title: "Edit trainers",
      message: "",
      trainers: trainers,
      back: indexUrl,
    });
  });
});

//REPLACE
router.post("/update", function (req, res, next) {
  const trainer = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    subject: req.body.subject,
    id: req.body.trainers_id,
  };

  const query =
    "UPDATE `trainers` SET `first_name` ='" +
    req.body.firstName +
    "', `last_name` ='" +
    req.body.lastName +
    "',`subject`='" +
    req.body.subject +
    "' WHERE `trainer_id` ='" +
    req.body.trainers_id +
    "';";

  dbconnection.query(query, function (err, status) {
    if (err) {
      res.render("trainers_edit", {
        title: "trainers - Edit",
        message: "Update failed! Check the values again!",
      });
    } else {
      res.redirect(
        "/trainers/list/trainer with id " +
          req.body.trainers_id +
          " is updated!"
      );
    }
  });
});

module.exports = router;
