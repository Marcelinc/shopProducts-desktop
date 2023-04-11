import { app, BrowserWindow, ipcMain, Menu } from 'electron'
import path from 'path'
import { readFile } from '../readFile.js'
import { writeFile } from '../writeFile'
import { readXML } from '../readXML'
import { writeXML } from '../writeXML'
import { readDB } from '../readDB.js'
import { Sequelize } from 'sequelize'
import { seedDB } from '../config/seedDB.js'
import { writeDB } from '../writeDB.js'

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

//if app not working, uncomment 
app.commandLine.appendSwitch('no-sandbox');

let win

async function createWindow () {
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
    await win.loadURL('http://localhost:5173/')
    win.webContents.openDevTools()
  } else {
    // In all other cases, load the index.html file from the dist folder
    win.loadURL(`file://${path.join(__dirname, '..' ,'dist', 'index.html')}`)
  }
}


//Menu
const menuTemplate = [{
    label: 'Napełnij bazę',
    click(){
      seedDB()
    }
  },{
    label: 'Legenda'
  }
]

if(process.platform == 'darwin')
  menuTemplate.unshift({});

if(IS_DEV)
  menuTemplate.push({
    label: 'DevTools',
    submenu:[{
        label: 'Toogle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item,focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },{
        role: 'reload'
      }
    ]
  })
const menu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(menu)


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




//reading txt
ipcMain.on('toMainReadFile',(event,args) => {
  readFile('katalog.txt',win)
    //
})
ipcMain.on('toMainWriteFile',(event,args) => {
  writeFile('katalog.txt',args,win)
})

//reading xml
ipcMain.on('toMainReadXML',(event,args) => {
  readXML('katalog.xml',win)
})
ipcMain.on('toMainWriteXML',(event,args) => {
  writeXML(args,win)
})

//reading DB
ipcMain.on('toMainReadDB',(event,args) => {
  readDB(Sequelize,win)
})
ipcMain.on('toMainWriteDB',(event,args) => {
  writeDB(Sequelize,args,win)
})