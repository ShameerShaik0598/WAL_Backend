const app = require("express")();

app.listen(7000, () => console.log("server is on port 7000"));

const cors = require("cors");
app.use(cors);
// app.use(cors(*))
// app.use(cors({origin:[' ',' ',' ',]}))
app.get("/tests", (req, res) => {
  res.send({ message: "working" });
});
