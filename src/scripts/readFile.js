const readline = require('readline');
//import readline from 'readline'
const fs = require('fs');
//import fs from 'fs'

const readFile = (filename) => {
  var lineno = 0;
  var products = [];
  var Producers = [];
  const myInterface = readline.createInterface({
    input: fs.createReadStream(filename)
  });

  //wyswietlenie naglowkow kolumn
  /*console.log('Nr.'.padEnd(4)+'Producent'.padEnd(12)+'Przekątna ekranu'.padEnd(17)+'Rozdzielczość ekranu'.padEnd(21)+
    'Powierzchnia ekranu'.padEnd(20)+'Dotykowy'.padEnd(9)+'Procesor'.padEnd(11)+'Rdzenie'.padEnd(9)+'Taktowanie[MHz]'.padEnd(16)+
    'RAM'.padEnd(7)+'Pojemność dysku'.padEnd(16)+'Rodzaj'.padEnd(7)+'Układ graficzny'.padEnd(24)+'Pamięć'.padEnd(7)+'System'.padEnd(24)+
    'Napęd')*/

  myInterface.on('line', function (line) {
    lineno++;
        //zapisanie danych oddzielonych srednikiem do zmiennej (tablicowej)
        var zmienna = line.split(';')
        products.push(zmienna[0]) //zmienna globalna

        //numer wiersza
        var row = lineno+'.'

        //zapisanie producentow do tablicy
        if(!Producers.find(producer => producer === zmienna[0]))
        Producers.push(zmienna[0])
    })

    return products
}

export {readFile} 