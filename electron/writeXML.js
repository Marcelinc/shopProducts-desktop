const { Builder } = require("xml2js");
const fs = require('fs')

const writeXML = (data) => {
    //console.log(data)
    const builder = new Builder()
    const xml = builder.buildObject(data)
    console.log(xml)
    //fs.writeFile('katalog.xml',xml,'utf8',() => {

   // })
}

module.exports = {writeXML}