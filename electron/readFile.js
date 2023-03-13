const readline = require('readline');
//import readline from 'readline'
const fs = require('fs');
//import fs from 'fs'

const readFile = (filename,win) => {
  var products = [];
  const read = new Promise(function(resolve,reject){
    var lineno = 0;
    
    //['Dell','AMD'],['MSI','Intel']
    const myInterface = readline.createInterface({
      input: fs.createReadStream(filename)
    });
  
    myInterface.on('line',function (line) {
      lineno++;
      //zapisanie danych oddzielonych srednikiem do zmiennej (tablicowej)
      var zmienna = line.split(';')
      zmienna.pop()   //usuniecie elmentu dodanego dla ostatniej iteracji konczacej petle
      products.push(zmienna) //zmienna globalna
    })
  
    myInterface.on('close',() => {
      resolve()
    })
    
    return products
  })

  read.then(() => {
    win.webContents.send("fromMainReadFile",products)
  })

}

module.exports = {readFile}