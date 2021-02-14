const studentData={
    studentID:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
    fName:["john","jack","gary","bobo","giannis","polo","goris","tolis","toig","goris","polies","gerald","verm","pilos","loulo","koris","manis","balous","markos","babis"],
    lName:["krolosd","bravos","arofags","aragorn","papadopoulos","papadis","karestins","gores","kaloreis","Aquilon","maroles","parotes","makorinis","piperias","ntomatas","keris","poitkes","koloeiers","aokaoewa","arenis"],
    dateOfBirth:["1987-12-12","1984-10-01","1975-02-09","1986-04-02","1988-08-12",'1988-01-21',"1986-04-02","1984-10-01",'1988-01-21',"1986-04-02","1987-12-12",'1988-05-12',"1984-10-01","1975-02-09","1975-02-09",'1988-01-21',"1984-10-01","1988-08-12",'1988-01-21',"1975-02-09"],
    tuitionFees:[1223,1324,151234,51234,1234,12341,5532,6457,76578,8675,34322,52352,266453,76574,23452,764748,875474,2345235,75463,2354]
};

const coursesData={
    coursesID:[1,2,3,4,5,6],
    title:["CB8","CB8","CB8","CB8","CB12","CB12"],
    stream:["java","java","c#","c#","Javascript","Javascript"],
    type:["full time","part time","full time","part time","full time","part time"],
    start_date:["2019/1/1","2019/1/1","2019/1/1","2019/1/1","2019/1/1","2019/1/1"],
    end_date:["2019/3/31","2019/3/31","2019/3/31","2019/3/31","2019/3/31","2019/3/31"]
};

const trainersData={
    trainerID:[1,2,3,4,5,6,7,8],
    fName:["polo","goris","gerald","verm","pilos","gary","bobo","giannis"],
    lName:["karas","anestopoulos","papadakis","destructor of hope","cookie monster","gafaris","kouris","makorinis"],
    subject:["c#","c#","java","java","javascript","javascript","HTML/CSS","Mysql"]
}
const assignmentsData={
    assignment_id:[1,2,3,4,5,6,7],
    title:["awesome assignment 1","awesome assignment 2","awesome assignment 3","awesome assignment 4","awesome assignment 5","awesome assignment 6","awesome assignment 7"],
    description:["quam ultrices, vel pellentesque tellus malesuada","Pellentesque sollicitudin sem maximus dictum pellentesque","odio mauris consequat mi, dapibus tristique sem lectus tincidunt tortor.","quam ultrices, vel pellentesque tellus malesuada","quam ultrices, vel pellentesque tellus malesuada","quam ultrices, vel pellentesque tellus malesuada","quam ultrices, vel pellentesque tellus malesuada"],
    type:["assignment","assignment","assignment","assignment","assignment","individual project","group project"],
    oralMark:[30,30,30,30,30,30,30,],
    totalMark:[100,100,100,100,100,100,100,]
}


module.exports={studentData:studentData, coursesData:coursesData, trainersData:trainersData, assignmentsData:assignmentsData}