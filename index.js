const glasstron = require('glasstron');
const electron = require('electron');
let win;
electron.app.commandLine.appendSwitch("enable-transparent-visuals");
electron.app.on('ready', () => {
	setTimeout(
		spawnWindow,
		process.platform == "linux" ? 1000 : 0
		// Electron has a bug on linux where it
		// won't initialize properly when using
		// transparency. To work around that, it
		// is necessary to delay the window
		// spawn function.
	);
	});

function spawnWindow(){
	win = new glasstron.BrowserWindow({
		width: 800,
		height: 600,
		frame: false
	});
	win.blurType = "blurbehind";
	win.setBlur(true);
	win.loadFile('index.html')
	win.removeMenu() 
	win.webContents.openDevTools({mode:"detach"})
	return win;
}

setTimeout(function() {
	win.transparent=false;
	console.log(win);
},2000)
// ...