export const show404Page = (req, res, next) => {
  res.status(404).render("404", {
    isAuthenticated: req.session.loggedIn,
    pageTitle: "404 Page",
    path: null,
  });
};
