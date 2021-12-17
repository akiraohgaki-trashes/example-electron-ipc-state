const { app, BrowserWindow, ipcMain } = require('electron');

let mainWindow = null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: `${__dirname}/preload.js`
    }
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  mainWindow.webContents.openDevTools();

  mainWindow.on('close', () => {
    mainWindow = null;
  });
});

// このように main 側でステートを持っていたとして
const state = { time: new Date().toISOString() };

// renderer からは window.api.state() でステート更新が可能
// main 側でステートが更新されると renderer 側で window.api.on('stateChanged')
// によって更新を監視しているイベントが動く
ipcMain.on('stateChange', (_event, newState) => {
  Object.assign(state, newState);
  mainWindow?.webContents.send('stateChanged', state);
});

// main で勝手にステートを更新しても通知すればよいだけ
setInterval(() => {
  Object.assign(state, { time: new Date().toISOString() });
  mainWindow?.webContents.send('stateChanged', state);
}, 3000);
