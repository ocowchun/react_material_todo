'use strict';
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var TodoWebAPI = require('../utils/TodoWebAPI.js');

var TodoActions = {
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
	receiveAll: function(todos) {
		AppDispatcher.handleServerAction({
			type: ActionTypes.RECEIVE_TODOS,
			todos:todos
		});
	}
};

module.exports = TodoActions;