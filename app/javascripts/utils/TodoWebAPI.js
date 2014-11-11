var uuid = require('./uuid');
var _ = require('underscore');

var fakeServer = (function() {
	todos = [];
	var server = {};
	server.createTodo = function(text,cb) {
		var id = uuid();
		var todo = {
			id: id,
			text: text
		};
		todos.push(todo);
		setTimeout(function() {
			cb(todo);
		}, 0);
	};

	server.getTodos = function(cb) {
		setTimeout(function() {
			cb(todos);
		}, 0);
	};

	return server;
})();

module.exports = {
	createTodo: function(text, cb) {
		fakeServer.createTodo(text, function(todo) {
			cb(todo);
		});
	},
	getTodos: function() {
		fakeServer.getTodos(function(todos) {

		});
	}

};