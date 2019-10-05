# SOAP vs REST

This article will demystify the battle between SQAP and REST API once for all . As a software developer I can remember the struggles which I have under went to understand the real story behind the SOAP and REST APIs and this article will try to simplify them as mush as possible. as always hard one first :) 

## SOAP
It stands for ["Simple Object Access Protocol"]("https://en.wikipedia.org/wiki/SOAP") but please forget the abbriviation and just learn it as SOAP like my name which is Ali , who knows maybe it stands for "Artificial Language Intelligence" :) , there was a time which SOAP abbriviation was making sence but maybe not anymore. 

### Whats is a <strong>Protocol</string>

```
How are you?
```

How can I make sure that you will answer "fine" ? no way right ? 

```
2 + 2 = ? 
```

but this time I can be sure enough that your answer is 4 right ? because me as the writer and you as the reader both are using the same protocol which is mathematic . this is the defenition of a protocol. SOAP is a protocol as well.

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

```
You may ask why it is so complicated ? 
```

The reason is it's not designed for human to understand. the idea of the web services born with the idea of letting computers to be able to talk to one another.

```
You may ask, but computers were able to talk to one another via TCP or UDP why SOAP ? 
```

The answer is simple , there are so many platforms , programming languages , operation systems and so on. If you are a C# developer and you want to use a functionality of a service which has been written in JAVA or C++. you need to port the assemblies to your platform or re-write the program from the scratch and what if its developer was chineese and the documentation is in Mandarin , then you will need a translator for the documentation and then to re-design the application according to the limitations of your desire language and platform and so on.

But just desiging a protocol was not enough because the next issue was how these web services can know before hand how to call and consume one another and that was the motivation behind the idea of WSDL or [Web Service Description Language"](https://en.wikipedia.org/wiki/Web_Services_Description_Language) another super complicated XML file which is describing how a web service is willing to serve its functionalities.

In order to uderstand the complexity of the WSDL files let's consider our Greeting service 

```javascript
Greeting: function(args) { 
    return { result: "Hello dear " + args.name};
}
```

to explain to the clients that we have service called Greeting and it takes one string argument and return a string as result the WSDL will something like this 

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

## REST
REST stands for ["Representational State Transfer"](https://en.wikipedia.org/wiki/Representational_state_transfer) which is exactly what it is.