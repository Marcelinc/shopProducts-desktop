import { app, BrowserWindow, ipcMain } from 'electron'
import path from 'path'
import { readFile } from '../readFile'
import { writeFile } from '../writeFile'

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

//if app not working, uncomment 
//app.commandLine.appendSwitch('no-sandbox');

let win

function createWindow () {
  // Create the main Electron window
  win = new BrowserWindow({
    width: 1500,
    height: 800,
    title: 'Shop Products',
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      preload: path.join(__dirname,"preload.js")
    }
  })

  if (IS_DEV) {
    // If we are in development mode we load content from localhost server - vite
    // and open the developer tools
    win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  } else {
    // In all other cases, load the index.html file from the dist folder
    win.loadURL(`file://${path.join(__dirname, '..' ,'dist', 'index.html')}`)
  }
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  // On macOS, it's common for an app and its menu bar to remain
  // active until the user shuts down the application via the Cmd + Q shortcut
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS, if an application is in the dock, it is common for a window to be created after
  // clicking on the icon in the dock if there are no windows active
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})



ipcMain.on('toMainReadFile',(event,args) => {
  readFile('katalog.txt',win)
    //
})

ipcMain.on('toMainWriteFile',(event,args) => {
  writeFile('katalog.txt',args,win)
})