"use strict";
var soap = require('strong-soap').soap;
var url = 'http://localhost:8000/services?wsdl';
var options = { endpoint: 'http://localhost:8000/services'};
var requestArgs = { name: "Ali Alp" };
soap.createClient(url, options, function(err, client) {
  if (err) {
      console.error("An error has occurred creating SOAP client: " , err);  
  } else {
      var description = client.describe();
      console.log("Client description:" , description);
      var method = client.Greeting;
      method(requestArgs, function(err, result, envelope, soapHeader) {
        //response envelope
        console.log('Response Envelope: \n' + envelope);
        //'result' is the response body
        console.log('Result: \n' + JSON.stringify(result));
      });
  }
});