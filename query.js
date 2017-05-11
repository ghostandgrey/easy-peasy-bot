"use-strict";

var credentials = require('./login.js');

const endpoint = "https://api.pcf-system.intware.com";
const CloudController = new (require("cf-nodejs-client")).CloudController(endpoint);
const UsersUAA = new (require("cf-nodejs-client")).UsersUAA;
const Apps = new (require("cf-nodejs-client")).Apps(endpoint);
const Events = new (require("cf-nodejs-client")).Events(endpoint);

var exports = module.exports = {};

exports.getCFEvents = function() {

    CloudController.getInfo().then(function(result) {
        UsersUAA.setEndPoint(result.authorization_endpoint);
        return UsersUAA.login(credentials.username, credentials.password);
    }).then(function(result) {
        Events.setToken(result);
        bearerToken = result.access_token;
        return Events.getEvents({q: "type:app.crash"});
    }).then(function(result) {
        console.log(result);
    }).catch(function(reason) {
        console.error("Error: " + reason);
    });
};
