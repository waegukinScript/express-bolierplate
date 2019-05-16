const Event = require('../models/Event');

exports.postEvent = (req, res, next) => {
  const obj = req.body;
  console.log('Events');
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

exports.postDeleteEvent = (req, res, next) => {
  const { id } = (req.params);
  Event.findOneAndDelete({ _id: id }, (err) => {
    if (err) {
      console.log(err);
    } else {
      return res.redirect('back');
    }
  });
};

exports.postEditEvent = (req, res, next) => {
  const { id } = (req.params);
  Event.findById({ _id: id }, (err, event) => {
    if (err) {
      console.log(err);
    } else if (event) {
      res.render('editEvent', {
        title: 'Edit Event',
        event
      });
    }
  });
};

exports.postUpdateEvent = (req, res, next) => {
  const { id } = (req.params);
  const obj = req.body;
  Event.findById({ _id: id }, (err, event) => {
    if (err) {
      console.log(err);
    } else if (event) {
      event.eventName = obj.eventName;
      event.eventDate = obj.eventDate;
      event.eventTime = obj.eventTime;
      event.guest = obj.guest;
      event.budget = obj.budget;
      event.contactName = obj.contactName;
      event.emailAddress = obj.emailAddress;
      event.phoneNumber = obj.phoneNumber;
      event.postMessage = obj.postMessage;
      event.save((err) => {
        if (err) {
          return next(err);
        }
        return res.redirect('/eventDatabase');
      });
    }
  });
};
