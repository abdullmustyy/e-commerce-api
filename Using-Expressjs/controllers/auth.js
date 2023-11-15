const getLogin = (req, res, next) => {
  res.render("auth/login", {
    isAuthenticated: req.session.loggedIn,
    pageTitle: "Login",
    path: "/login",
  });
};

const postLogin = (req, res, next) => {
  req.session.loggedIn = true;
  res.redirect("/products-list");
};

const postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    err && console.log("Error while destroying session: \n", err);
  });
  res.redirect("/products-list");
};

export { getLogin, postLogin, postLogout };
