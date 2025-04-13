const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  onAppClose: (callback) => ipcRenderer.on('app-close', callback),
  confirmClose: () => ipcRenderer.send('confirm-close')
})