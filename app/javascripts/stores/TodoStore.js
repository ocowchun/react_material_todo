var _ = require('underscore');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var AppConstants = require('../constants/AppConstants');
var uuid = require('../utils/uuid');
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
      todo.id === id;
    });
  },

  getAll: function() {
    return todos;
  },
  getTodoText: function() {
    console.log("getTodoText",todoText)
    return todoText;
  }
});

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
    var createdTodo = action.todo
    todos.push(createdTodo);
    todoText = '';
    TodoStore.emitChange();
  };

  if (handles[action.type]) {

    handles[action.type]();
  }

  return true; // No errors.  Needed by promise in Dispatcher.

});

module.exports = TodoStore;