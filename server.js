var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextId = 1;

//{
// 	id: 1,
// 	description: 'meer mom for lunch',
// 	completed: false
// },{
// 	id: 2,
// 	description: 'Go to market',
// 	completed: false
// },{
// 	id: 3,
// 	description: 'makan',
// 	completed: true
//}


app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function(req, res){
	res.json(todos);
});

app.get('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var cocok;

	todos.forEach(function(todo){
		if (todoId === todo.id) {
			cocok = todo;
		}
	});

	if (cocok) {
		res.json(cocok);
	}else{
		res.status(404).send();
	}

	res.json('Asking for todo with id of ' +req.params.id);
});

app.post('/todos', function(req, res){
	var body = req.body;
	body.id = todoNextId++;
	todos.push(body);
	console.log('Description ' + body.description);
	res.json(body);
});


app.listen(PORT, function(){
	console.log('Express listening on port: ' + PORT);
});

//test ssh