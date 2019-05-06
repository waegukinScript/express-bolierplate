/**
 * GET /
 * Home page.
 */
exports.getContactDatabase = (req, res) => {
  res.render('contactDatabase', {
    title: 'contactDatabase'
  });
};
