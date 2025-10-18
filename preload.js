// Minimal, safe preload. Expose only explicit APIs you need.
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  // Add explicit methods as needed, for example:
  // openExternal: (url) => require('electron').shell.openExternal(url)
})