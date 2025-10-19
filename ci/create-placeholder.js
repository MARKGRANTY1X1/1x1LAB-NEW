{
  "name": "1x1lab",
  "version": "1.0.0",
  "private": true,
  "main": "main.js",
  "scripts": {
    "start": "electron .",
    "build:web": "node ./ci/create-placeholder.js",
    "build": "npm run build:web",
    "dist": "electron-builder --win nsis --x64"
  },
  "devDependencies": {
    "electron": "^24.0.0",
    "electron-builder": "^24.0.0"
  },
  "build": {
    "appId": "com.1x1lab.desktop",
    "productName": "1x1LAB",
    "directories": {
      "buildResources": "assets",
      "output": "dist_electron"
    },
    "files": [
      "dist/**/*",
      "main.js",
      "package.json",
      "node_modules/**/*"
    ],
    "win": {
      "icon": "assets/icon.ico",
      "target": [
        "nsis",
        "zip"
      ]
    },
    "nsis": {
      "oneClick": false,
      "perMachine": false,
      "allowToChangeInstallationDirectory": true
    }
  }
}
