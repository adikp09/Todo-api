var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
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
	var cocok = _.findWhere(todos,{id: todoId});

	if (cocok) {
		res.json(cocok);
	}else{
		res.status(404).send();
	}

	res.json('Asking for todo with id of ' +req.params.id);
});


app.post('/todos', function(req, res){
	var body = _.pick(req.body, 'description', 'completed'); 

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(404).send();
	}

	body.description = body.description.trim();

	body.id = todoNextId++;
	todos.push(body);
	//console.log('Description ' + body.description);
	res.json(body);
});

app.delete('/todos/:id', function(req, res){
	var todoId = parseInt(req.params.id, 10);
	var cocok = _.findWhere(todos,{id: todoId});

	if (!cocok) {
		res.status(404).send();
	}else{
		todos = _.without(todos, cocok)
		res.json(cocok);
	}

	res.json('Asking for todo with id of ' +req.params.id);
});


app.listen(PORT, function(){
	console.log('Express listening on port: ' + PORT);
});

//test ssh