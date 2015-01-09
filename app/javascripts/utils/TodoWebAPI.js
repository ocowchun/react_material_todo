'use strict';
var uuid = require('./uuid');
var _ = require('underscore');


var fakeServer = (function() {
	var todos = [];
	var server = {};
	server.createTodo = function(text, cb) {
		var id = uuid();
		var todo = {
			id: id,
			text: text,
			done: false
		};
		todos.push(todo);
		setTimeout(function() {
			cb(_.clone(todo));
		}, 0);
	};

	server.completeTodo = function(cb) {
		var todo = _.last(todos);
		if (todo) {
			todo.done = true;
		}
		setTimeout(function() {
			cb(_.clone(todo));
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
		fakeServer.createTodo(text, cb);
	},
	getTodos: function() {
		fakeServer.getTodos(function(todos) {
			return todos;
		});
	},
	completeTodo: function(cb) {
		fakeServer.completeTodo(cb)
	}

};