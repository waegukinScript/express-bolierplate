// const nodemailer = require("nodemailer");
const Event = require('../models/Event');

/**
 * POST /event
 */
exports.postEvent = (req, res) => {

  const obj = req.body;

  //Here, I have set default value
  //obj.eventTime = "1";
  //obj.guest = "1";

  console.log("Events");
  console.log(obj);

  const event = new Event({
    eventName: obj.eventName,
    eventDate: obj.eventDate,
    eventTime: obj.eventTime,
    guest: obj.guest,
    budget: obj.budget,
    contactName: obj.contactName,
    emailAddress: obj.emailAddress,
    phoneNumber: obj.phoneNumber,
    postMessage: obj.postMessage,
  });

  event.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });

};
// Deletes the post from the admin
exports.postDeleteEvent =  (req, res, next) => {
  const {id} = (req.params)
  doc =   Event.findOneAndDelete({_id: id},function(err, doc) {
    if( err) {
      console.log(err);
    }
    console.log(doc)
    return res.redirect('back')
  })
  console.log("message blah after button clicked", req.event)
  
};

// 1.Trying to edit the form
exports.postEditEvent = (req, res, next) => {
  const {id} = (req.params)
  doc = Event.findById({_id: id}, function(err, doc){
    if (err) {
      console.log(err);
    }
    console.log(doc)
    return res.redirect('back')
  })
  console.log("you are editing this row", req.event)
};

//2. Then we are going to try to update the form

exports.postUpdateEvent = (req, res, next) => {
  const {id} = (req.params)
  doc = Event.findById({_id: id}, function(err, doc){
    if (err) {
      console.log(err);
    }
    console.log(doc)
    return res.redirect('back')
  })
  console.log("you are editing this row", req.event)
};