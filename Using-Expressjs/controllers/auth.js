import User from "../models/user.js";

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

const postSignup = (req, res, next) => {};

const postLogin = (req, res, next) => {
  User.findById("645149c940989cb744d4649a")
    .then((user) => {
      req.session.user = user;
      req.session.loggedIn = true;
      req.session.save((err) => {
        err && console.log("Error while saving session: \n", err);
        res.redirect("/products-list");
      });
    })
    .catch((err) => {
      console.log("Error saving user to session: \n", err);
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    err && console.log("Error while destroying session: \n", err);
    res.redirect("/products-list");
  });
};

export { getLogin, postLogin, postLogout, getSignup, postSignup };
