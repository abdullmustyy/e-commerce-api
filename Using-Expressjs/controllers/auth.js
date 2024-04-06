import crypto from "crypto";
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

const getReset = (req, res, next) => {
  res.render("auth/reset", {
    pageTitle: "Reset Password",
    path: "/reset",
    errorMessage: req.flash("error"),
  });
};

const getNewPassword = (req, res, next) => {
  const token = req.params.token;

  User.findOne({
    resetToken: token,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      res.render("auth/new-password", {
        pageTitle: "New Password",
        path: "/new-password",
        errorMessage: req.flash("error"),
        userId: user._id.toString(),
        passwordToken: token,
      });
    })
    .catch((err) => {
      console.log("Error while getting token: \n", err);
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

const postReset = (req, res, next) => {
  const { email } = req.body;

  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      req.flash("error", "An error occurred. Please try again.");
      return res.redirect("/reset");
    }

    const token = buffer.toString("hex");

    User.findOne({ email })
      .then((user) => {
        if (!user) {
          req.flash("error", "No account with that email found.");
          return res.redirect("/reset");
        }

        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;

        return user.save();
      })
      .then((user) => {
        const username = email.split("@")[0];

        res.redirect("/login");

        return renderEmailTemplate("reset-password", {
          email,
          username,
          subject: "Password Reset",
          pageTitle: "Password Reset",
          token,
        });
      })
      .catch((err) => {
        console.log("Error while resetting password: \n", err);
      });
  });
};

const postNewPassword = (req, res, next) => {
  const { userId, password, passwordToken } = req.body;

  User.findOne({
    _id: userId,
    resetToken: passwordToken,
    resetTokenExpiration: { $gt: Date.now() },
  })
    .then((user) => {
      if (!user) {
        req.flash("error", "Invalid token. Please try again.");
        return res.redirect("/reset");
      }

      return bcryptjs.hash(password, 12).then((hashedPassword) => {
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiration = undefined;

        return user.save();
      });
    })
    .then((user) => {
      res.redirect("/login");

      return renderEmailTemplate("template", {
        email: user.email,
        username: user.email.split("@")[0],
        subject: "Password Reset Successful",
        pageTitle: "Password Reset Successful",
        body: "Your password has been successfully reset!",
      });
    })
    .catch((err) => {
      console.log("Error while setting new password: \n", err);
    });
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    err && console.log("Error while destroying session: \n", err);
    res.redirect("/products-list");
  });
};

export {
  getLogin,
  postLogin,
  postLogout,
  getSignup,
  postSignup,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword,
};
