const express = require("express");
const mongoose = require("mongoose");

const User = require("./models/user");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

const dbUrl =
  "mongodb+srv://work:work123@richescontact.xdvod.mongodb.net/react-node?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to database");
  } catch (error) {
    console.log(error);
  }
};

connectDB();

app.post("/api/register", async (req, res) => {
  try {
    await User.create({
      name: req.body.userName,
      email: req.body.userEmail,
    });
    res.json({
      message: "User Registered",
    });
  } catch (error) {
    res.json({
      message: "Email Already Used",
    });
  }
});

app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json({
      users: users,
    });
  } catch (error) {
    console.log(errors);
  }
});

const port = 5000;

app.listen(port, () => {
  console.log("server running on port " + port);
});
