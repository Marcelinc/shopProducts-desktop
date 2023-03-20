const fs = require('fs')

const writeFile = (filename,data,win) => {
    //console.log('przyslane:',data)
    let content = ''
    let updated = true

    //convert data to string lines
    if(data && data.length > 0){
        data.forEach(row => {
            row.forEach(rowInfo => {
                content += rowInfo+';'
            })
            content += '\n'
        })
    }
    //console.log('content:',content)

    //writeFile
    try{
        fs.writeFileSync(filename,content)    
    } catch(err){
        console.log(err)
        updated = false
    }
    
    win.webContents.send('fromMainWriteFile',updated)
}

module.exports = {writeFile}