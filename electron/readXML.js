const fs = require('fs')
const { Parser } = require('xml2js')


const readXML = (filename,win) => {

    const parser = new Parser()

    fs.readFile(filename,'utf8',(err,data) => {
        if(!err){
            parser.parseString(data, (err,result) => {
                if(!err){
                    console.log(result)
                    win.webContents.send('fromMainReadXML',result)
                }
                    
            })
        }
            
    })
}

module.exports = {readXML}