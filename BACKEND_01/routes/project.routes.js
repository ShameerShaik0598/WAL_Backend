const exp = require("express");
const projectApi = exp.Router();
projectApi.use(exp.json());
const {
  getAllEmp,
  empByProjectId,
  empOnBench,
  projectsAssiToEmp,
  projectNames,
} = require("../controllers/project.controller");
const verifyToken=require("../middleware/verifyToken")
module.exports = projectApi;

projectApi.get("/emps", getAllEmp);
projectApi.get("/project-names", projectNames);
projectApi.get("/project-id/:projectId", empByProjectId);
projectApi.get("/emp-id/:empId", projectsAssiToEmp);
projectApi.get("/emp-bench", empOnBench);
