const { app, BrowserWindow } = require('electron')
const path = require('path')

const isDev = !!process.env.ELECTRON_START_URL || process.env.NODE_ENV === 'development'

function createWindow () {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    // Load remote URL in development
    const startUrl = process.env.ELECTRON_START_URL || 'https://copy-of-copy-of-crypto-mining-2-1046645786545.us-west1.run.app'
    win.loadURL(startUrl)
  } else {
    // Load local build in production
    win.loadFile(path.join(__dirname, 'build', 'index.html'))
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})
