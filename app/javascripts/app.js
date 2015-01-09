var React = require('react');

var App = require('./components/app');

React.render(React.createElement(App),
	document.getElementById('react')
);

var $txtTodo = $('#new-todo');
var $body = $('body');
$body.on('keyup', function(e) {
	if (e.which === 68) {
		$txtTodo.focus();
	}
});