# SOAP vs REST

This article will demystify the enigma of SQAP or REST once for all . As a software developer I can remember the struggles which I have endured to understand the real story behind the SOAP and REST APIs and therefore in this article I will try to simplify them as mush as possible. so without any further adiue let's dive in.

## SOAP
It stands for [Simple Object Access Protocol]("https://en.wikipedia.org/wiki/SOAP") but please forget the abbriviation and just learn it as SOAP like my name which is Ali , who knows maybe it stands for "Artificial Language Intelligence" :) , there was a time which SOAP abbriviation was making sence but maybe not anymore. 

### Whats is a <strong>Protocol</string>
If I asked you 

```
How are you?
```

How can I make sure that you will answer "fine" ? no way right ? 

how about

```
2 + 2 = ? 
```

this time I can be quite sure that your answer is 4, right ? because me as the writer and you as the reader both are using the same protocol which is mathematic . this is the defenition of a protocol. SOAP is a protocol as well.

In SOAP protocol in order to call a function which is taking a name as its argument and response with a greeting message like this 

```javascript
Greeting: function(args) { 
    return { result: "Hello dear " + args.name};
}
```

We should ask it like this

<strong>SOAP Request</strong>

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Body>
    <ns1:Greeting xmlns:ns1="urn:examples:GreetingService">
      <name>Ali Alp</name>
    </ns1:Greeting>
  </soap:Body>
</soap:Envelope>
```

and we will receive a response like this 

<strong>SOAP Response</strong>

```xml
<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Header/>
  <soap:Body>
    <ns1:GreetingResponse xmlns:ns1="urn:examples:GreetingService">
      <result>Hello dear Ali Alp</result>
    </ns1:GreetingResponse>
  </soap:Body>
</soap:Envelope>
```

As it can seen above, in order to call a simple Greeting service, there are a lot of meta data which needs to be transmitted, meanwhile the complexity of the SOAP is not ending here and there is one more piece which is required for the SOAP in order to function. WSDL or [Web Service Description Language](https://en.wikipedia.org/wiki/Web_Services_Description_Language) is a super complicated XML file which the SOAP web-service is using to explain its services to the clients, basically it's announcing the details of the SOAP envelope that you need to generate for your request.

Below you can find the WSDL of the greeting service which has been mentioned above

```xml
<definitions name = "GreetingService"
   targetNamespace = "http://www.examples.com/wsdl/GreetingService.wsdl"
   xmlns = "http://schemas.xmlsoap.org/wsdl/"
   xmlns:soap = "http://schemas.xmlsoap.org/wsdl/soap/"
   xmlns:tns = "http://www.examples.com/wsdl/GreetingService.wsdl"
   xmlns:xsd = "http://www.w3.org/2001/XMLSchema">
   <message name = "GreetingRequest">
      <part name = "userName" type = "xsd:string"/>
   </message>
   <message name = "GreetingResponse">
      <part name = "result" type = "xsd:string"/>
   </message>
   <portType name = "Greeting_PortType">
      <operation name = "Greeting">
         <input message = "tns:GreetingRequest"/>
         <output message = "tns:GreetingResponse"/>
      </operation>
   </portType>
   <binding name = "Greeting_Binding" type = "tns:Greeting_PortType">
      <soap:binding style = "rpc"
         transport = "http://schemas.xmlsoap.org/soap/http"/>
      <operation name = "Greeting">
         <soap:operation soapAction = "Greeting"/>
         <input>
            <soap:body encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/" namespace = "urn:examples:GreetingService" use = "encoded"/>
         </input>
         <output>
            <soap:body encodingStyle = "http://schemas.xmlsoap.org/soap/encoding/" namespace = "urn:examples:GreetingService" use = "encoded"/>
         </output>
      </operation>
   </binding>
   <service name = "Greeting_Service">
      <documentation>WSDL File for GreetingService</documentation>
      <port binding = "tns:Greeting_Binding" name = "Greeting_Port">
         <soap:address
            location = "http://www.examples.com/Greeting/" />
      </port>
   </service>
</definitions>
```

As it can be seen it is a complicated XML code for a simple service, but considering the interoperablity of it, will justify its complexity, moreover there are plenty of tools out there to generate WSDL for you.

### Pros 
* [WS-Security](https://en.wikipedia.org/wiki/WS-Security)
* [WS-AtomicTransaction](https://en.wikipedia.org/wiki/WS-Atomic_Transaction)
* [WS-ReliableMessaging](https://en.wikipedia.org/wiki/WS-ReliableMessaging)
* Language, platform, and transport independent
* Works well in distributed enterprise environments
* Standardized
* Provides significant pre-build extensibility in the form of the WS standards
* Built-in error handling
* Automation when used with certain language products

### Cons 
* High bandwidth usage 
* Complex to learn 
* heavy to parse and process 
* only support XML 

## REST
REST stands for ["Representational State Transfer"](https://en.wikipedia.org/wiki/Representational_state_transfer). If you figured out the SOAP therefore understanding REST will be piece of cake.

REST is not protocol like SOAP, and also it has been designed to work over the HTTP protocol while SOAP is independeant of any language, platform and transport.

In REST in order to call a function which is taking a name as its argument and response with a greeting message like this 

```javascript
Greeting: function(args) { 
    return { result: "Hello dear " + args.name};
}
```

We should ask it like this

```
http://server:port/greeting?name=Ali-Alp
```

and we will receive a response like this

```
Hello dear Ali-Alp
```

### Pros 
* No expensive tools require to interact with the Web service
* Easy to learn 
* Efficient bandwidth usage(Smaller message size comparing to SOAP)
* Fast (no extensive processing required)
* Closer to other Web technologies in design philosophy

### Cons
* Not very secure 
* External documentation of the data model is required 

I hope you have a better understanding of both SOAP and REST API, to answer the enigma I should say that there is no enigma in the first place. maybe both SOAP and REST are being used in same direction but they are totally for different applications. A rule of thumb, use REST for most of your web-services and in case you really stuck with the available features of the REST API and you did your research enough then have a look at the SOAP protocol.  
