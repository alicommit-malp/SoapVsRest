var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
});

app.get("/greeting", (req, res, next) => {
    console.log(req);
    res.send("Hello dear: " + req.query.name);
   });