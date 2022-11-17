const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const user = require("./models/user");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3000;

mongoose.connect(
  "mongodb://root:rootpassword@mongo:27017/usersdb?authSource=admin",
  () => {
    console.log("MongoDB connection: Successful");
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

app.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    console.log(
      JSON.stringify({ message: "Listing all users", count: users.length })
    );
    return res.status(200).send(users);
  } catch (err) {
    return res
      .status(409)
      .send({ message: "Error while listing all users", error: err });
  }
});

app.get("/user/:userId", async (req, res) => {
  try {
    const foundUser = await User.findById(
      req.params.userId,
      (err, result) => {}
    );

    if (foundUser) {
      console.log(
        JSON.stringify({
          message: "Searching for a user with id: " + req.params.userId,
          status: "success",
        })
      );
    }
    return res.status(200).send(foundUser);
  } catch (err) {
    console.log(
      JSON.stringify({
        message:
          "Error while searching for a user with id: " + req.params.userId,
        error: err,
      })
    );
    return res.status(409).send({ message: "User not found" });
  }
});

app.post("/user", async (req, res) => {
  const newUser = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    age: req.body.age,
  });
  const savedUser = await newUser.save((err) => {
    if (err) {
      console.log(
        JSON.stringify({ message: "Error while adding new user", error: err })
      );
      return res
        .status(400)
        .send({ message: "Error while adding new user", error: err });
    }
  });
  console.log(JSON.stringify({ message: "New user added", newUser: newUser }));
  return res.status(200).send({ message: "User added", user: newUser });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
