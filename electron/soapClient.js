const soap = require('soap');

//get laptop count by producer
const sendSoapRequest = async (manufacturer,win) => {
    
    soap.createClient('http://localhost:5000/MyFunction?wsdl',async (err,client) => {
        //console.log('args: ',manufacturer);
        await client.MyFunction({manufacturer},async (err,result) => {
            console.log('res => ',result)
            console.log('err => ',err)
            if(result && !err){
                win.webContents.send('fromMainSoapLaptopCountByProducer',result)
            }
        })
        /*client.GetLaptopsByProducer({name:'Dell'},(err,result) => {
            console.log('res => ',result)
            console.log('err => ',err)
            if(result &&!err){
                win.webContents.send('fromMainSoap',result)
            }
        })*/
    })
}

//get laptop list by matrix type
const sendSoapClientLaptopListByMatrixType = async (matrixType,win) => {
    
    soap.createClient('http://localhost:5000/MyFunction?wsdl',async (err,client) => {
        console.log('args: ',matrixType);
        await client.getLaptopListByMatrixType({matrixType},async (err,result) => {
            console.log('res => ',result)
            console.log('err => ',err)
            if(result &&!err){
                win.webContents.send('fromMainSoapLaptopListByMatrixType',result)
            }
        })
    })
}


//get laptop list by resolution
const sendSoapClientLaptopListByResolution = async (resolution,win) => {
    
    soap.createClient('http://localhost:5000/MyFunction?wsdl',async (err,client) => {
        console.log('args: ',resolution);
        await client.getLaptopCountByResolution({resolution},async (err,result) => {
            console.log('res => ',result)
            console.log('err => ',err)
            if(result &&!err){
                win.webContents.send('fromMainSoapLaptopCountByResolution',result)
            }
        })
    })
}

module.exports = {sendSoapRequest,sendSoapClientLaptopListByMatrixType,sendSoapClientLaptopListByResolution}