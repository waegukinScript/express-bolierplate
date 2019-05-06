/**
 * GET /
 * Home page.
 */
exports.getEventDatabase = (req, res) => {
  res.render('eventDatabase', {
    title: 'eventDatabase'
  });
};
