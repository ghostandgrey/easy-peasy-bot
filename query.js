"use-strict";

const endpoint = "https://api.pcf-system.intware.com";
const username = "";
const password = "";

const CloudController = new (require("cf-nodejs-client")).CloudController(endpoint);
const UsersUAA = new (require("cf-nodejs-client")).UsersUAA;
const Apps = new (require("cf-nodejs-client")).Apps(endpoint);
const Events = new (require("cf-nodejs-client")).Events(endpoint);

var accessToken;

var exports = module.exports = {};

exports.getCFEvents = function() {

    CloudController.getInfo().then((result) = > {
        UsersUAA.setEndPoint(result.authorization_endpoint);
        return UsersUAA.login(username, password);
    }).then((result) = > {
        Events.setToken(result);
        bearerToken = result.access_token;
        return Events.getEvents({q: "type:app.crash"});
    }).then((result) = > {
        console.log(result);
    }).catch((reason) = > {
        console.error("Error: " + reason);
    });
}
