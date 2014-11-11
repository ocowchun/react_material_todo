'use strict';
var React = require('react');
var todoListTemplate = require('.././templates/todoList');
var TodoItem = React.createFactory(require('./todoItem'));
var _=require('underscore');

var TodoList = React.createClass({
	render: function() {
		var todos = this.props.todos;
		var todoItems = _.map(todos, function(message) {
			return TodoItem({
				content: message.text,
				key: message.id
			});
		});
		this.props.todos = todoItems;
		return todoListTemplate.call(this);
	}
});

module.exports = TodoList;
