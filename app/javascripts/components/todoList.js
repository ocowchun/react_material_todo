'use strict';
var React = require('react');
var todoListTemplate = require('.././templates/todoList');
var TodoItem = React.createFactory(require('./todoItem'));
var _=require('underscore');

var TodoList = React.createClass({
	render: function() {
		var todos = this.props.todos;
		var todoItems = _.map(todos, function(message) {
			
			var status=message.done?"done":"doing";
			return TodoItem({
				content: message.text,
				status:status,
				key: message.id
			});
		});
		this.props.todos = todoItems;
		return todoListTemplate.call(this);
	}
});

module.exports = TodoList;
