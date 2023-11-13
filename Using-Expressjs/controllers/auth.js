const getLogin = (req, res, next) => {
  res.render("auth/login", {
    isAuthenticated: req.session.loggedIn,
    pageTitle: "Login",
    path: "/login",
  });
};

const postLogin = (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect("/");
};

const getLogout = (req, res, next) => {
  req.session.loggedIn = false;
  res.redirect("/");
};

export { getLogin, postLogin, getLogout };
