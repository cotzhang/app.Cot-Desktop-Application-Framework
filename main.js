const electron = require('electron');
const vibe = require('@pyke/vibe');
vibe.setup(electron.app);
const path = require('path');
const os = require('os')
const remote = require("@electron/remote/main")
let win;
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

function spawnWindow() {
	win = new electron.BrowserWindow({
		width: 600,
		height: 400,
		backgroundColor: '#00000000',
		resizable: false,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true,
			contextIsolation: false,
		},	
		show:false
	});
	require('@electron/remote/main').initialize()
	require('@electron/remote/main').enable(win.webContents)
	// win.setVisualEffect(PARAMS.CORNER, VALUE.CORNER.ROUND); 
	win.loadFile('index.html')
	vibe.applyEffect(win, 'acrylic', '#FFFFFF40');
	if (electron.nativeTheme.shouldUseDarkColors) vibe.setDarkMode(win);
	//win.setHasShadow(true)
	win.removeMenu()
	//win.setAlwaysOnTop("alwaysOnTop")
	// win.webContents.openDevTools({ mode: "detach" })
	remote.enable(win.webContents)
	win.webContents.on('did-finish-load', () => {
		win.show();
	});
	return win;
}

electron.nativeTheme.on('updated', () => {
	const wins = electron.BrowserWindow.getAllWindows();
	if (electron.nativeTheme.shouldUseDarkColors) {
		vibe.setDarkMode(win);

	} else {
		vibe.setLightMode(win);

	}
});