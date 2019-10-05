var soap = require('strong-soap').soap;
var http = require('http');
var myService = {
    Greeting_Service: {
        Greeting_Port: {
            Greeting: function(args) { 
                return { result: "Hello dear " + args.name};
            }
        }
    }   
};
var xml = require('fs').readFileSync('greetingService.wsdl', 'utf8');
var server = http.createServer(function(request,response) {
    response.end("404: Not Found: " + request.url);
});
var port = 8000;
server.listen(port);
var soapServer = soap.listen(server, '/services', myService, xml);
soapServer.log = function(type, data) {
    console.log('Type: ' + type + ' data: ' + data);
};
console.log('SOAP service listening on port ' + port);