var express = require("express");
const { use } = require("express/lib/router");
var router = express.Router();

const mongoose = require("mongoose");
const { route } = require("../app");

const schema = mongoose.Schema({
  name: String,
  email: String,
  city: String,
  phone: Number,
});

const User = mongoose.model("User", schema);

/* GET users listing. */
router.post("/", function (req, res, next) {
  try {
    const bd = req.body;
    const user = new User({
      name: bd.name,
      email: bd.email,
      city: bd.city,
      phone: bd.phone,
    });
    user.save();
    res.send(user);
    res.status(201);
  } catch (error) {
     res.status(500);
    res.send("data not saved")
  }
});

router.get("/", async function (req, res, next) {
  try {
    const allusers = await User.find();
    res.send(allusers);
  } catch (error) {
    res.status(404);
    res.send("data not found")
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    res.send(user);
  } catch (error) {
     res.status(404);
    res.send("user not found")
  }
});

router.delete("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.send("user delete successfully");
  } catch (error) {
     res.sendStatus(401)
    res.send("user not deleted")
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    const data = req.body;

    if (data.name) {
      user.name = data.name;
    }

    if (data.city) {
      user.city = data.city;
    }

    if (data.email) {
      user.email = data.email;
    }

    if (data.phone) {
      user.phone = data.phone;
    }

    user.save();
    res.send(user);
  } catch (error) {
    res.status(500);
    res.send("user not updated");
  }
});

module.exports = router;
