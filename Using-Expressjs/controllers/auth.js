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

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
  });
  res.redirect("/");
};

export { getLogin, postLogin, postLogout };
