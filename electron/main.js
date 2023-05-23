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
import { sendSoapRequest } from '../soapClient.js'
import { sendSoapClientLaptopListByMatrixType } from '../soapClient.js'
import { sendSoapClientLaptopListByResolution } from '../soapClient.js'

const IS_DEV = process.env.IS_IN_DEVELOPMENT || false

//if app not working, uncomment 
app.commandLine.appendSwitch('no-sandbox');

let windows = new Set();

async function createWindow () {
  // Create the main Electron window
  /*let serverWin = new BrowserWindow({
    width: 1500,
    height: 500,
    x: 0,
    y: 0,
    title: 'Shop Products - Server',
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      preload: path.join(__dirname,"preload.js")
    }
  })
  let clientWin = new BrowserWindow({
    width: 1500,
    height: 500,
    x: 0,
    y:501,
    title: 'Shop Products - Client',
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation: true,
      preload: path.join(__dirname,"preload.js")
    }
  })*/
  let restClientWin = new BrowserWindow({
    width:1400,
    height:600,
    x:0,
    y:0,
    title: 'Shop Products - Rest Client',
    webPreferences: {
      nodeIntegration: false,
      enableRemoteModule: false,
      contextIsolation:true,
      preload: path.join(__dirname,"preload.js")
    }
  })
  //windows.add(serverWin)
  //windows.add(clientWin)
  windows.add(restClientWin)

  if (IS_DEV) {
    // If we are in development mode we load content from localhost server - vite
    // and open the developer tools
    //await serverWin.loadURL('http://localhost:5173/server')
    //serverWin.webContents.openDevTools()

    //await clientWin.loadURL('http://localhost:5173/client')
    //clientWin.webContents.openDevTools()

    await restClientWin.loadURL('http://localhost:5173/restClient')
    restClientWin.webContents.openDevTools()

  } else {
    // In all other cases, load the index.html file from the dist folder
    //serverWin.loadURL(`file://${path.join(__dirname, '..' ,'dist', 'index.html')}`)
    //clientWin.loadURL(`file://${path.join(__dirname, '..' ,'dist', 'index.html')}`)
    restClientWin.loadURL(`file://${path.join(__dirname, '..' ,'dist', 'index.html')}`)
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
  readFile('katalog.txt',[...windows][0])
    //
})
ipcMain.on('toMainWriteFile',(event,args) => {
  writeFile('katalog.txt',args,[...windows][0])
})

//reading xml
ipcMain.on('toMainReadXML',(event,args) => {
  readXML('katalog.xml',[...windows][0])
})
ipcMain.on('toMainWriteXML',(event,args) => {
  writeXML(args,[...windows][0])
})

//reading DB
ipcMain.on('toMainReadDB',(event,args) => {
  readDB(Sequelize,[...windows][0])
})
ipcMain.on('toMainWriteDB',(event,args) => {
  writeDB(Sequelize,args,[...windows][0])
})


//soap
ipcMain.on('toMainSoapLaptopCountByProducer',(event,args) => {
  sendSoapRequest(args,[...windows][1])
})

ipcMain.on('toMainSoapLaptopListByMatrixType',(event,args) => {
  sendSoapClientLaptopListByMatrixType(args,[...windows][1])
})

ipcMain.on('toMainSoapLaptopCountByResolution',(event,args) => {
  sendSoapClientLaptopListByResolution(args,[...windows][1])
})


//rest