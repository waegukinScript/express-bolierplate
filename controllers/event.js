const fs = require('fs');
const pdf = require('html-pdf');
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


exports.postGetReportEvent = (req, res, next) => {
  const { id } = (req.params);
  Event.findById({ _id: id }, (err, event) => {
    if (err) {
      console.log(err);
    } else if (event) {
      const html = `
                    <style>
                    table{
                        border-collapse: collapse;
                        margin-top: 30px;
                        margin-left: 70px;
                        margin-right: 30px;
                    }
                    .heading{
                        font-weight: bold;
                        width: 150px;
                    }
                    .value{
                        width: 500px;
                    }
                    </style>
                    <div style="margin-top: 50px">
                      <h1 style="margin-left: 70px;">Event</h1>
                      <hr style=" margin-top:0px; height:10px;border:none;color:#333;background-color:#333; margin-left: 70px; margin-right: 73px;" />
                      <table border="1">
                        <tr>
                          <td class="heading">Event Name</td>
                          <td class="value">${event.eventName}</td>
                        </tr>
                        <tr>
                          <td class="heading">Event Date</td>
                          <td class="value">${event.eventDate}</td>
                        </tr>
                        <tr>
                          <td class="heading">Event Time</td>
                          <td class="value">${event.eventTime}</td>
                        </tr>
                        <tr>
                          <td class="heading">Guest</td>
                          <td class="value">${event.guest}</td>
                        </tr>
                        <tr>
                          <td class="heading">Budget</td>
                          <td class="value">${event.budget}</td>
                        </tr>
                        <tr>
                          <td class="heading">Contact Name</td>
                          <td class="value">${event.contactName}</td>
                        </tr>
                        <tr>
                          <td class="heading">Email Address</td>
                          <td class="value">${event.emailAddress}</td>
                        </tr>
                        <tr>
                          <td class="heading">Phone Number</td>
                          <td class="value">${event.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td class="heading">Message</td>
                          <td class="value">${event.postMessage}</td>
                        </tr>
                        <tr>
                          <td class="heading">Date Entered</td>
                          <td class="value">${event.createdAt}</td>
                        </tr>
                      </table>
                  </div>
          `;
      const pdfFilePath = './event.pdf';
      const options = { format: 'Letter' };
      pdf.create(html, options).toFile(pdfFilePath, (err, res2) => {
        if (err) {
          console.log(err);
          res.status(500).send('Some kind of error...');
          return;
        }
        fs.readFile(pdfFilePath, (err, data) => {
          res.contentType('application/pdf');
          res.send(data);
        });
      });
    }
  });
};
