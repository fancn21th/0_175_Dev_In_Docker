const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://alexfan:fancn21th@mongo:27017?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("successfully connected to DB");
  })
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Hello World!!");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
