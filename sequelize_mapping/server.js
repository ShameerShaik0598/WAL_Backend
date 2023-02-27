// import express
const exp = require("express");
const app = exp();

require("dotenv").config();
const sequelize = require("./db/db.config");
const expressAsyncHandler = require("express-async-handler");
//get models (import named exports)
const { customer } = require("./customer_model/customer.model");
const { Op, where } = require("sequelize"); // to use operators
const { Person } = require("./customer_model/person.model");
const { Skill } = require("./customer_model/person.skill.model");
const { Emps } = require("./customer_model/emp.model");
const { Jobs } = require("./customer_model/job.model");
const { Customers } = require("./customer_model/acc_holder.model");
const { Accounts } = require("./customer_model/bank_acc.model");
const { Users } = require("./customer_model/Users");
const { Address } = require("./customer_model/Adress");
const { Skills } = require("./customer_model/Skills");
const { ContactDetails } = require("./customer_model/contactDetails.model");

//assigning port number
const PORT = process.env.PORT || 7000;
app.listen(7000, () => console.log(`Server on port ${PORT}...`));

//Test DB connection
sequelize
  .authenticate() //authenticate mthod used to test connection
  .then(() => console.log("DB connection sucessful"))
  .catch((err) => console.log("err in DB connection", err));

//create tables for all models
sequelize.sync({ force: true });
//body parser
app.use(exp.json());

//emps and jobs ONE TO ONE
//establish one to one mapping between emp and job
// Emps.hasOne(Jobs, { foreignKey: { name: "empId" } });
// Jobs.belongsTo(Emps, { foreignKey: { name: "empId" } });
//establish one to one mapping between emp and job with association
Emps.Jobs = Emps.hasOne(Jobs, { foreignKey: { name: "empId" } });
//establish one to one mapping between customer and bank account
Customers.hasMany(Accounts, { foreignKey: { name: "cust_id" } });
//establish one-one and one-many mapping between users,address,skills and contact details
Users.Address = Users.hasOne(Address, { foreignKey: { name: "user_id" } });
Users.Skills = Users.hasMany(Skills, { foreignKey: { name: "user_id" } });
Users.ContactDetails = Address.hasOne(ContactDetails, {
  foreignKey: { name: "usr_id" },
});

//Post User details from 3 models with association
app.post(
  "/create-user",
  expressAsyncHandler(async (req, res) => {
    await Users.create(req.body, {
      include: [
        {
          association: Users.Address,
          include: [
            {
              association: Users.ContactDetails,
            },
          ],
        },
        {
          association: Users.Skills,
        },
      ],
    });
    res.send({ message: "new user created" });
    console.log(Users.ContactDetails);
  })
);

//get users details by using "Eager Loading"
app.get(
  "/users",
  expressAsyncHandler(async (req, res) => {
    // // eager loading
    let user = await Users.findAll({
      include: [
        {
          model: Address,
          attributes: ["city"],
          include: [
            {
              model: ContactDetails,
            },
          ],
        },
        {
          model: Skills,
        },
      ],
    });
    res.send({ message: "users are", payload: user });
  })
);

//get users by "Lazy Loading"
app.get(
  "/lazyloading-users",
  expressAsyncHandler(async (req, res) => {
    let [user] = await Users.findAll();
    console.log(user.toJSON());
    //get address
    let address = await user.getAddress();
    console.log(address.toJSON());
    //get contact details
    let contactDetails = await address.getContactDetail();
    console.log(contactDetails.toJSON());
    //get skills
    let skills = await user.getSkills();
    // console.log(skills.toJSON());

    res.send({
      message: "user details are",
      payload: {
        user: user,
        address: address,
        contactDetails: contactDetails,
        skills: skills,
      },
    });
  })
);
//routes for emp and job model without association
// app.post(
//   "/create-emp",
//   expressAsyncHandler(async (req, res) => {
//     let { emp_id, emp_name, job_id, job_desc } = req.body;
//     let emp = await Emps.create({ emp_id: emp_id, emp_name: emp_name });
//     console.log("emp", emp.toJSON);
//     let job = await Jobs.create({
//       job_id: job_id,
//       job_desc: job_desc,
//     });

//     //set job to emp
//     emp.setJob(job);
//     res.send({ message: "new emp created" });
//   })
// );

app.post(
  "/create-emp",
  expressAsyncHandler(async (req, res) => {
    await Emps.create(req.body, {
      include: [
        {
          association: Emps.Jobs,
        },
      ],
    });
    res.send({ message: "new emp created" });
  })
);
//create job
app.post(
  "/create-job",
  expressAsyncHandler(async (req, res) => {
    await Jobs.create(req.body);
    res.send({ message: "New Job Created" });
  })
);

//get emp
app.get(
  "/emps",
  expressAsyncHandler(async (req, res) => {
    // // eager loading
    // let emps = await Emps.findAll({
    //   include: {
    //     model: Jobs,
    //     attributes: ["job_desc"],
    //   },
    // });
    // res.send({ message: "emps are", payload: emps });
    // lazy loading
    let [emp] = await Emps.findAll();
    console.log(emp.toJSON());
    //get job
    let job = await emp.getJob();
    console.log(job.toJSON());
    res.send({ message: "emps are", payload: { emp: emp, job: job } });
  })
);

//create customer
app.post(
  "/create-customer",
  expressAsyncHandler(async (req, res) => {
    //await customer.sync();
    await customer.create(req.body);
    res.send({ message: "New customer Created" });
    // //get customer from client
    // let newCustomer = req.body;
    // //create a row new customer for object
    // let cust = customer.build(req.body);
    // console.log(cust.toJSON());
    // //insert into DB
    // await cust.save();
    res.send({ message: "New customer Created" });
  })
);

//routes for acc_holder and bank_acc
// app.post(
//   "/create-",
//   expressAsyncHandler(async (req, res) => {
//     let { emp_id, emp_name, job_id, job_desc } = req.body;
//     let emp = await Emps.create({ emp_id: emp_id, emp_name: emp_name });
//     console.log("emp", emp.toJSON);
//     let job = await Jobs.create({
//       job_id: job_id,
//       job_desc: job_desc,
//     });

//get all customers
app.get(
  "/get-customers",
  expressAsyncHandler(async (req, res) => {
    let customers = await customer.findAll({
      where: {
        customer_id: {
          [Op.ne]: 100, //ne is 'not equal to' operator
        },
      },
    });
    res.send({ message: "customers are", payload: customers });
  })
);

//get customer 1st model
app.get(
  "/customer/:customer_id",
  expressAsyncHandler(async (req, res) => {
    let customer_pk = await customer.findByPk(req.params.customer_id);
    res.send({ message: "customer is", payload: customer_pk });
  })
);

//get non key
app.get(
  "/customer/name/:customer_name",
  expressAsyncHandler(async (req, res) => {
    let customerName = await customer.findOne({
      where: { customer_name: req.params.customer_name },
    });
    res.send({ message: "customer is", payload: customerName });
  })
);

//update
app.put(
  "/update-customer",
  expressAsyncHandler(async (req, res) => {
    let updateCount = await customer.update(req.body, {
      where: { customer_id: req.body.customer_id },
    });
    if (updateCount == 0) {
      res.send({
        message: "Either No Customer found to Update (or) Nothing to Update",
      });
    } else {
      res.send({ message: "customer updated" });
    }
  })
);

//delete customer
app.delete(
  "/delete-customer/:customer_id",
  expressAsyncHandler(async (req, res) => {
    let deleteCount = await customer.destroy({
      where: { customer_id: req.params.customer_id },
    });
    if (deleteCount == 0) {
      res.send({ message: "no customer found" });
    } else {
      res.send({ message: "customer deleted" });
    }
  })
);

// app.post(
//   "/person",
//   expressAsyncHandler(async (req, res) => {
//     // await Person.sync();
//     await Person.create(req.body);
//     res.send({ message: "New customer Created" });
//   })
// );

// app.post(
//   "/skill",
//   expressAsyncHandler(async (req, res) => {
//     // await Skill.sync();
//     await Skill.create(req.body);
//     res.send({ message: "New skill added" });
//   })
// );

// err handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.send({ errMsg: err.message });
});
