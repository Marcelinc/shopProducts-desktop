const { Builder } = require("xml2js");

const writeXML = (data) => {
    console.log(data)
    const builder = new Builder()
    const xml = builder.buildObject(data)
    console.log(xml)
}

module.exports = {writeXML}