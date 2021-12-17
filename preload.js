const { contextBridge, ipcRenderer } = require('electron');

// main と renderer の架け橋となる window.api を用意しています
contextBridge.exposeInMainWorld('api', {
  state: (state) => {
    ipcRenderer.send('stateChange', state);
  },
  on: (channel, callback) => {
    ipcRenderer.on(channel, (_event, ...args) => {
      callback(...args);
    });
  }
});
