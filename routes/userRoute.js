import express from "express";
import User from "../models/userModel.js";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  let users = await User.find({});
  res.send(users);
});

userRouter.get("/signin", async (req, res) => {
  res.render("signin");
});

userRouter.post("/signin", async (req, res) => {
  console.log(req.body);
  try {
    User.create(req.body);

    res.redirect("/user/login");
  } catch (error) {
    res.status(404).render("error");
  }
});

userRouter.get("/login", (req, res) => {
  res.status(200).render("login");
});

userRouter.post("/login", (req, res) => {
  const { email, password } = req.body;

  let user = User.findOne(email, password);
  if (user) {
    res.status(200).redirect("/dashboard");
  } else {
    res.status(404).redirect("/login");
  }
});

export { userRouter };
