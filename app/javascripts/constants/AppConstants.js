var keyMirror = require('react/lib/keyMirror');
module.exports = {
	PayloadSources: keyMirror({
		VIEW_ACTION: null,
		SERVER_ACTION: null
	}),
	ActionTypes: keyMirror({
		RECEIVE_TODOS: null,
		RECEIVE_CREATED_TODO: null,
		TODO_CREATE: null,
		TODO_SUBMIT:null,
		TODO_COMPLETE:null,
		RECEIVE_COMPLETED:null
	})
};