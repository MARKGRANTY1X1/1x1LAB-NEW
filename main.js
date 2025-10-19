const path = require('path');
const fs = require('fs');
const { app, BrowserWindow, shell } = require('electron');
function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: "1x1LAB",
    icon: path.join(__dirname, "assets", "icon.ico"),
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  const startUrl = process.env.ELECTRON_START_URL;
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  const loadLocal = () => {
    if (fs.existsSync(indexPath)) {
      win.loadFile(indexPath).catch(err => {
        console.error('Failed to load local index.html:', err);
        win.loadURL('data:text/html,<h1>App failed to load</h1><pre>' + encodeURIComponent(String(err)) + '</pre>');
      });
    } else {
      console.error('index.html not found at', indexPath);
      win.loadURL('data:text/html,<h1>index.html not found</h1><p>Expected: ' + indexPath + '</p>');
    }
  }
  if (startUrl) {
    console.log('ELECTRON_START_URL set — attempting to load', startUrl);
    win.loadURL(startUrl).catch(err => { console.warn('Failed to load startUrl — falling back to local build:', err); loadLocal(); });
    win.webContents.on('did-fail-load', (e, errorCode, errorDesc, validatedURL, isMainFrame) => { if (isMainFrame) loadLocal(); });
    win.webContents.openDevTools();
  } else {
    loadLocal();
  }
  win.webContents.setWindowOpenHandler(({ url }) => { shell.openExternal(url); return { action: 'deny' }; });
  win.setMenuBarVisibility(false);
}
app.whenReady().then(() => { createWindow(); app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); }); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
