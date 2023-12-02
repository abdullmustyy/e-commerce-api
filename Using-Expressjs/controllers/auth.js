import User from "../models/user.js";
import bcryptjs from "bcryptjs";

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    isAuthenticated: req.session.loggedIn,
    pageTitle: "Signup",
    path: "/signup",
  });
};

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    isAuthenticated: req.session.loggedIn,
    pageTitle: "Login",
    path: "/login",
  });
};

const postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) return res.redirect("/signup");

      return bcryptjs
        .hash(password, 12)
        .then((hashedPassword) => {
          return User.create({
            email,
            password: hashedPassword,
            cart: { items: [] },
          });
        })
        .then((result) => {
          res.redirect("/login");
        });
    })
    .catch((err) => {
      console.log("Error while signing up: \n", err);
    });
};

const postLogin = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) return res.redirect("/login");

      bcryptjs.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.user = user;
          req.session.loggedIn = true;
          req.session.save((err) => {
            err && console.log("Error while saving session: \n", err);
            res.redirect("/products-list");
          });
        } else {
          res.redirect("/login");
        }
      });
    })
    .catch((err) => {
      console.log("An error occurred while logging in: ", "\n", err);
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    err && console.log("Error while destroying session: \n", err);
    res.redirect("/products-list");
  });
};

export { getLogin, postLogin, postLogout, getSignup, postSignup };
