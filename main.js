var app = require('app');
var BrowseWindow = require('browser-window');

require('crash-reporter').start();
var mainWindow = null;

app.on('window-all-closed', function() {
	if (process.platform != 'darwin')
		app.quit();
});

app.on('ready', function() {
	mainWindow = new BrowseWindow({
		width: 800,
		height: 600
	});
	mainWindow.loadUrl('file://'+__dirname+'/'+'dist/index.html');
	mainWindow.on('close',function(){
		mainWindow=null;
	});
});

