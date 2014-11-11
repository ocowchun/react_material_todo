'use strict';
// var GameActions = require('./../actions/GameActions');

var React = require('react');
var appTemplate = require('.././templates/app');
var TodoActions = require('../actions/TodoActions');
var TodoStore = require('../stores/TodoStore');
var ENTER_KEY = 13;

function getTodoState() {
	return {
		// allTodos: TodoStore.getAll(),
		// areAllComplete: TodoStore.areAllComplete()
		todos: TodoStore.getAll(),
		text: TodoStore.getTodoText()
	};
}

var App = React.createClass({
	getInitialState: function() {
		return getTodoState();
	},

	componentDidMount: function() {
		TodoStore.addChangeListener(this._onChange);
	},
	onChange: function(e) {
		this.setState({
			text: e.target.value
		});
	},
	handleNewTodoKeyDown: function(event) {

		if (event.which !== ENTER_KEY) {
			return;
		}
		event.preventDefault();
		var text = this.state.text;
		TodoActions.create(text);
		// return false;


	},
	_onChange: function() {
		this.setState(getTodoState());
	},
	render: function() {
		return appTemplate.call(this);
	}

});

module.exports = App;