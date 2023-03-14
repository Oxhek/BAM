const { app, BrowserWindow, ipcMain } = require('electron')
const { displayEvents } = require('./Events.js')
const { Createfile } = require('./utils/files.js')
const path = require('path')

let MainWindow = null

function createWindow () {
    MainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'preload.js')
        }
    })
    MainWindow.loadURL(`file://${__dirname}/views/index.html`)
}

app.on('ready', () => {
    createWindow()
    Createfile()
})
