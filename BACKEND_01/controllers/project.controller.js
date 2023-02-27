const connection = require("../database/db.config");

//use promise for async and await
const db = connection.promise();

//import express-async-handler
const expressAsyncHandler = require("express-async-handler");

//get all employees
const getAllEmp = expressAsyncHandler(async (req, res, next) => {
  let [rows, fields] = await db.query("select * from emp");
  res.send({ MessageChannel: "emp details are:", payload: rows });
});

//get projects
const projectNames = expressAsyncHandler(async (req, res, next) => {
  let [projectdetails] = await db.query("select * from projects ");
  res.send({ Message: "project details are:", payload: projectdetails });
});

//get emp with specific projects using projectid
const empByProjectId = expressAsyncHandler(async (req, res) => {
  //get projectid from url
  let projectId = req.params.projectId;
  console.log(projectId);
  //get emp details through projectid
  let [rows, fields] = await db.query(
    "select * from projects where projectId=?",
    projectId
  );
  if (rows == undefined) {
    res.send({ Message: "emp not found in table for projects" });
  } else {
    res.send({ Message: "emp details are : ", payload: rows });
  }
});

// get projects which are assigned to specific emp
const projectsAssiToEmp = expressAsyncHandler(async (req, res) => {
  //get empid from url
  let empId = req.params.empId;
  console.log(empId);
  //get projects details through empId
  let [rows, fields] = await db.query(
    "select * from projects where emp_id=?",
    empId
  );
  if (rows == undefined) {
    res.send({ Message: "no projects are assined" });
  } else {
    res.send({ Message: "project details are : ", payload: rows });
  }
});

//get emps on bench
const empOnBench = expressAsyncHandler(async (req, res) => {
  let [rows, fields] = await db.query(
    "select * from emp left join projects on emp.emp_id=projects.emp_id where projects.projectId is null;"
  );
  res.send({ Message: "emp on bench is: ", payload: rows });
});

module.exports = {
  getAllEmp,
  empByProjectId,
  projectNames,
  empOnBench,
  projectsAssiToEmp,
};
