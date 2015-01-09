'use strict';
var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';
var todos = [];
var todoText = '';

var TodoStore = _.extend(new EventEmitter(), {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  get: function(id) {
    return _.find(todos, function(todo) {
      return todo.id === id;
    });
  },

  getAll: function() {
    return todos;
  },
  getTodoText: function() {
    return todoText;
  }
});

function clearTodoText() {
  todoText = '';
}

function findTodoIdx(todo) {
  for (var i = 0, max = todos.length; i < max; i++) {
    var t = todos[i];
    if (t.id === todo.id) {
      return i;
    }
  }
  return -1;
}

TodoStore.dispatchToken = AppDispatcher.register(function(payload) {
  var action = payload.action;
  var handles = {};
  handles[ActionTypes.RECEIVE_TODOS] = function() {
    todos = action.todos;
    TodoStore.emitChange();
  };

  handles[ActionTypes.TODO_CREATE] = function() {
    todoText = action.text;
    TodoStore.emitChange();
  };

  handles[ActionTypes.RECEIVE_CREATED_TODO] = function() {
    var createdTodo = action.todo;
    todos.push(createdTodo);
    clearTodoText();
    TodoStore.emitChange();
  };

  handles[ActionTypes.RECEIVE_COMPLETED] = function() {
    var todo = action.todo;
    if (todo) {
      var idx = findTodoIdx(todo);
      if (idx !== -1) {
        todos[idx].done = todo.done;
      } else {
        todos.push(todo);
      }
    }

    clearTodoText();
    TodoStore.emitChange();
  };

  if (handles[action.type]) {

    handles[action.type]();
  }

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = TodoStore;