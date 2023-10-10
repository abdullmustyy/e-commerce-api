const getLogin = (req, res, next) => {
  res.render("auth/login", {
    isAuthenticated: req.cookies.loggedIn,
    pageTitle: "Login",
    path: "/login",
  });
};

const postLogin = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=true");
  res.redirect("/");
};

const getLogout = (req, res, next) => {
  res.setHeader("Set-Cookie", "loggedIn=false");
  res.redirect("/");
};

export { getLogin, postLogin, getLogout };
