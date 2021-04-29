var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const port = 9505;
var todos = [];
var complete = [];
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    next();
  });
  
app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.get("/getTodos", (request, response) => response.status(200).json(todos));
app.get("/getComplete", (request, response) => response.status(200).json(complete));
app.post("/postNewTodo", (request, response) => {
    var newTodo = request.body;
    if(newTodo.complete == 1){
        complete.push(newTodo);
        todos = todos.filter(x => x.id != newTodo.id);
    }
    else{
        todos.push(newTodo);
    }
    response.status(201).json(newTodo);
  });

app.listen(process.env.PORT || 3000);
