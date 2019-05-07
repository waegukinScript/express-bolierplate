/**
 * GET /
 * Home page.
 */
const Event = require('../models/Event');
exports.getEventDatabase = (req, res) => {

   // get all events   
   Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }
    // return a view with data
    res.render('eventDatabase', { 
      title: 'eventDatabase',
      events: events,
      success: req.flash('success')
    });
  });
 
  // res.render('eventDatabase', {
  //   title: 'eventDatabase'
  // });
};

/**
 * Show all events
 */
function showEvents(req, res) {
  // get all events   
  Event.find({}, (err, events) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }

    // return a view with data
    res.render('pages/events', { 
      events: events,
      success: req.flash('success')
    });
  });
}
