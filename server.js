var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'meer mom for lunch',
	completed: false
},{
	id: 2,
	description: 'Go to market',
	completed: false
},{
	id: 3,
	description: 'makan',
	completed: true
}];

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


app.listen(PORT, function(){
	console.log('Express listening on port: ' + PORT);
});