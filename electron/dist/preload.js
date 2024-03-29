const {contextBridge,ipcRenderer} = require("electron");

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["toMainReadFile","toMainWriteFile", 'toMainReadXML','toMainWriteXML','toMainReadDB','toMainWriteDB','toMainSoapLaptopCountByProducer',
                'toMainSoapLaptopListByMatrixType', 'toMainSoapLaptopCountByResolution'];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels = ["fromMainReadFile","fromMainWriteFile",'fromMainReadXML','fromMainWriteXML','fromMainReadDB','fromMainWriteDB',
                'fromMainSoapLaptopCountByProducer', 'fromMainSoapLaptopListByMatrixType', 'fromMainSoapLaptopCountByResolution'];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        }
    }
);