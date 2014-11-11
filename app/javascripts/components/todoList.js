var React = require('react');
var todoListTemplate = require('.././templates/todoList');
var ToDoItem = React.createFactory(require('./todoItem'));
var _=require('underscore');

var TodoList = React.createClass({
	render: function() {
		var todos = this.props.todos;
		console.log(todos);
		var todoItems = _.map(todos, function(message) {
			return ToDoItem({
				content: message.text,
				key: message.id
			});
		});
		this.props.todos = todoItems;
		return todoListTemplate.call(this);;
	}
});

module.exports = TodoList;


// var _ = require('underscore');
// var MessageListTemplate = require('.././templates/message_list');
// var Message = require('.././components/message');
// var MessageStore = require('../stores/MessageStore');

// function getStateFromStores() {
// 	return {
// 		messages: MessageStore.getAll()
// 	};
// }

// var MessageList = React.createClass({

// 	getInitialState: function() {
// 		return getStateFromStores();
// 	},
// 	componentDidMount: function() {
// 		MessageStore.addChangeListener(this._onChange);
// 	},

// 	componentWillUnmount: function() {
// 		MessageStore.removeChangeListener(this._onChange);
// 	},
// 	/**
// 	 * Event handler for 'change' events coming from the stores
// 	 */
// 	_onChange: function() {
// 		this.setState(getStateFromStores());
// 	},
// 	render: function() {
// 		// var nowShowing = this.props.state.nowShowing;
// 		var messages = this.state.messages;
// 		var main = _.map(messages, function(message) {
// 			return Message({
// 				content: message.content,
// 				key: message.id
// 			});
// 		});
// 		this.props.messages = main;
// 		return MessageListTemplate.call(this);;
// 	}
// });

// module.exports = MessageList;