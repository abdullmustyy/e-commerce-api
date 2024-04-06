import User from "../models/user.js";
import bcryptjs from "bcryptjs";
import { renderEmailTemplate } from "../services/email.service.js";

const getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Signup",
    path: "/signup",
    errorMessage: req.flash("error"),
  });
};

const getLogin = (req, res, next) => {
  res.render("auth/login", {
    pageTitle: "Login",
    path: "/login",
    errorMessage: req.flash("error"),
  });
};

const postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash("error", "Email already exists. Please login.");
        return res.redirect("/signup");
      }

      if (password !== confirmPassword) {
        req.flash("error", "Passwords do not match.");
        return res.redirect("/signup");
      }

      const username = email.split("@")[0];

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

          return renderEmailTemplate("template", {
            email,
            username,
            subject: "Signup Successful!",
            pageTitle: "Signup Successful",
            body: "You have successfully signed up!",
          });
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
      if (!user) {
        req.flash("error", "Invalid email or password.");
        return res.redirect("/login");
      }

      bcryptjs.compare(password, user.password).then((doMatch) => {
        if (doMatch) {
          req.session.user = user;
          req.session.loggedIn = true;
          req.session.save((err) => {
            err && console.log("Error while saving session: \n", err);
            res.redirect("/products-list");
          });
        } else {
          req.flash("error", "Invalid email or password.");
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
