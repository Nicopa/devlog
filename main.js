const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/devlog/browser/index.html`),
      protocol: "file:",
      slashes: true
    })
  );
  mainWindow.on('close', (event) => {
    event.preventDefault();
    console.log('Window close event triggered');
    mainWindow.webContents.send('app-close');
  });
  ipcMain.on('confirm-close', () => {
    console.log('Confirmed close event triggered');
    mainWindow.destroy();
  });
  mainWindow.on('closed', function () {
    mainWindow = null
  });
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
});