var config = require("../config");
var sendgrid = require("sendgrid")(config.sendgridKey);

exports.send = async (to, subject, body) => {
    sendgrid.send({
        to: to,
        from: "f.alves99@hotmail.com",
        subject: subject,
        html: body,
    });
};
