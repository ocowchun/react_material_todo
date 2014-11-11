var React = require('react');
var todoItemTemplate = require('.././templates/todoItem');


var TodoItem = React.createClass({
	render: function() {
		return todoItemTemplate.call(this);;
	}
});

module.exports = TodoItem;