const { Builder } = require("xml2js");
const fs = require('fs')

const writeXML = (data,win) => {
    //console.log(data)
    let updated = true
    const builder = new Builder()
    const xml = builder.buildObject(data)
    console.log(xml)
    fs.writeFile('katalog.xml',xml,err => {
        if(err)
            updated = false
        
        win.webContents.send('fromMainWriteXML',updated)
    })
}

module.exports = {writeXML}