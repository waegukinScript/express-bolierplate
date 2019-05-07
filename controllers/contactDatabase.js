/**
 * GET /
 * Home page.
 */
// const nodemailer = require("nodemailer");
const Contact = require('../models/Contact');

exports.getContactDatabase = (req, res) => {
  // get all events   
  Contact.find({}, (err, contacts) => {
    if (err) {
      res.status(404);
      res.send('Events not found!');
    }
    // return a view with data
    res.render('contactDatabase', { 
      title: 'contactDatabase',
      contacts: contacts,
      success: req.flash('success')
    });
  });
};
