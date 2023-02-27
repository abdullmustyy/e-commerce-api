export const show404Page = (req, res, next) => {
  res.status(404).render("404", {
    pageTitle: "404 Page",
    path: null,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
