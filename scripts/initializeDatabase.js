var mysql2 = require("mysql2");
const data= require('../models/data');
const studentData= data.studentData;
const trainersData=data.trainersData;
const coursesData=data.coursesData;
const assignmentsData=data.assignmentsData;

var connection = mysql2.createConnection({
    multipleStatements:true,
    connectTimeout:1000,
    host:'localhost',
    user:'root',
    password:'5610',
    port:3306
});


//mysql statements for DB creation
const createSchema = "CREATE DATABASE IF NOT EXISTS `school_assignment`; USE `school_assignment`;";
const createStudents ="CREATE TABLE IF NOT EXISTS `students` (student_id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(40) NOT NULL, last_name VARCHAR(40) NOT NULL, dateOfBirth DATE NOT NULL, tuitionFees INT NOT NULL);";
const createTrainers = "CREATE TABLE IF NOT EXISTS `trainers` (trainer_id INT AUTO_INCREMENT PRIMARY KEY, first_name VARCHAR(45) NOT NULL, last_name VARCHAR(45) NOT NULL, subject VARCHAR(45) NOT NULL);";
const createAssignment = "CREATE TABLE IF NOT EXISTS `assignment` (assignment_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45) NOT NULL, description VARCHAR(200) NOT NULL, type VARCHAR(45) NOT NULL, oralMark INT NOT NULL, totalMark INT NOT NULL, subDateTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);";
const createCourses = "CREATE TABLE IF NOT EXISTS `courses` (courses_id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(45) NOT NULL, stream VARCHAR(45) NOT NULL, type VARCHAR(45) NOT NULL, start_date DATE NOT NULL,end_date DATE NOT NULL);";

const createStructure = [createSchema, createStudents, createTrainers, createAssignment, createCourses];



//Create connection
connection.connect(function(error) {
    if(error) {
        console.log("YOU FAILED HERE IS HOW:" + error);
    } else {
        console.log("Connected!");
    }
});





//insert querry function
function insert(query){
    connection.query(query, function(err){
      if(err){
          console.log('Error in insertion'+err);
      } else {
          console.log('Inserted');
          
      }
      
    });
  };
  




//adds data of students in the students table
function populateStudents(data){
    for(let i=0;i<20;i++){
      let studentID = data.studentID[i];
      let fName = data.fName[i];
      let lName = data.lName[i];
      let dateOfBirth = data.dateOfBirth[i];
      let tuitionFees = data.tuitionFees[i];
      let studentQuerry=`INSERT IGNORE INTO students(student_id,first_name,last_name,dateOfBirth,tuitionFees) VALUES (${studentID},'${fName}','${lName}','${dateOfBirth}',${tuitionFees})`;
      console.log(studentQuerry)
      insert(studentQuerry);
    }
  };
  

//adds data of trainers in the trainers table
function populateTrainer(data){
    for(let i=0;i<8;i++){
      let trainerID = data.trainerID[i];
      let fName = data.fName[i];
      let lName = data.lName[i];
      let subject = data.subject[i];
      let Querry=`INSERT IGNORE INTO trainers (trainer_id,first_name,last_name,subject) VALUES (${trainerID},'${fName}','${lName}','${subject}')`;
      console.log(Querry)
      insert(Querry);
    }
  };
  
//adds data of courses in the courses table
function populateCourses(data){
    for(let i=0;i<6;i++){
      let coursesID = data.coursesID[i];
      let title= data.title[i];
      let stream = data.stream[i];
      let type = data.type[i];
      let start_date = data.start_date[i];
      let end_date = data.end_date[i];
      let Querry=`INSERT IGNORE INTO courses (courses_id,title,stream,type,start_date,end_date) VALUES (${coursesID},'${title}','${stream}','${type}','${start_date}','${end_date}')`;
      console.log(Querry)
      insert(Querry);
    }
  };

  //adds data of assignments in the assignments table
function populateAssignments(data){
    for(let i=0;i<7;i++){
      let assignment_id = data.assignment_id[i];
      let title= data.title[i];
      let description = data.description[i];
      let type = data.type[i];
      let oralMark = data.oralMark[i];
      let totalMark = data.totalMark[i];
      let Querry=`INSERT IGNORE INTO assignment (assignment_id,title,description,type,oralMark,totalMark) VALUES (${assignment_id},'${title}','${description}','${type}','${oralMark}','${totalMark}')`;
      console.log(Querry)
      insert(Querry);
    }
  };
  





//Loop through the create querries and inserts them
function createListLoop(createArray){
   for(let i=0;i<createArray.length;i++){
       let querry = createArray[i];
       connection.query(querry, function(err){
             if(err){
                 console.log('creation failed at'+ i +"and with error"+ err);
             }else{
                 console.log("Praise the lord it is done!");
             }
       });
   }
};

//A function to create the school structure and data
function createDB(){
    console.log("createDB starting");

    connection.query("DROP DATABASE IF EXISTS `school_assignment`", function(err){
        if(err){
            console.log ("Cant start creation...to the googlemobil"+ err);
        }else{
            console.log("building..");

            createListLoop(createStructure);
            populateStudents(studentData);
            populateTrainer(trainersData);
            populateCourses(coursesData);
            populateAssignments(assignmentsData);
            connection.end(function(err){
                if(err){
                  console.log("Connection not closed"+err);
                }
            });

        }
    })
};

createDB();







