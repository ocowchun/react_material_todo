'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var TodoWebAPI = require('../utils/TodoWebAPI.js');
var _ = require('underscore');

var TodoActions = {
	/**
	 * user send text
	 * @param  {string} text 使用者送出的text
	 */
	submit: function(text) {
		AppDispatcher.handleViewAction({
			type: ActionTypes.TODO_SUBMIT,
			text: text
		});
		console.log(text);

		var command = text.split(' ')[0];
		var thing = text;
		if (command === 'now') {
			thing = text.replace('now', '');
		}
		//決定後續動作
		var handler = {};
		handler['now'] = function(text) {
			TodoActions.create(text);
		};

		handler['done'] = function() {
			TodoActions.complete();
		};

		handler['today'] = function() {
			// TodoActions.create(text);
		};

		handler['defaultNow'] = function(text) {
			TodoActions.create(text);
		};

		if (_.include(['now', 'done', 'today'], command)) {
			handler[command](thing);
		} else {
			handler['defaultNow'](thing);
		}

	},
	create: function(text) {
		AppDispatcher.handleViewAction({
			type: ActionTypes.TODO_CREATE,
			text: text
		});
		var cb = function(todo) {
			TodoActions.receiveCreated(todo);
		};
		TodoWebAPI.createTodo(text, cb);
	},
	receiveCreated: function(todo) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.RECEIVE_CREATED_TODO,
			todo: todo
		});
	},
	complete: function() {
		AppDispatcher.handleViewAction({
			type: ActionTypes.TODO_COMPLETE
		});
		var cb = function(todo) {
			TodoActions.receiveCompleted(todo);
		};
		TodoWebAPI.completeTodo(cb);
	},
	receiveCompleted: function(todo) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.RECEIVE_COMPLETED,
			todo: todo
		});
	},
	receiveAll: function(todos) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.RECEIVE_TODOS,
			todos: todos
		});
	}
};

module.exports = TodoActions;