console.log("start of non blocking operation");

// const fs = require("fs");
// fs.readFile("./data.txt", (err, data) => {
//   if (!err) {
//     console.log("reading file complered");
//   }
// });

// setTimeout(() => {
//   console.log("timeout executed");
// }, 0);

// setImmediate(() => {
//   console.log("immediate executed");
// });

setTimeout(() => {
  console.log("timeout one executed");
}, 2000);

setImmediate(() => {
  console.log("immediate testing");
});

// setTimeout(() => {
//   console.log("timeout four sec executed");
// }, 4000);

// console.log("end of non blocking operations");

// const baz = () => console.log("baz");
// const foo = () => console.log("fo0");
// const zoo = () => console.log("zoo");
// const start = () => {
//   console.log("start");
//   setImmediate(baz);
//   new Promise((resolve, reject) => {
//     resolve("bar");
//   }).then((resolve) => {
//     console.log(resolve);
//     process.nextTick(zoo);
//   });
//   process.nextTick(foo);
// };
// start();

// setTimeout(() => {
//   console.log("TIMEOUT EXECUTED");
//   setImmediate(() => console.log("immediate in timeout exceuted"));
// }, 1000);

// setImmediate(() => {
//   console.log("immediate in timeout exceuted");
//   setTimeout(() => {
//     console.log("TIMEOUT EXECUTED");
//   }, 0);
// });
