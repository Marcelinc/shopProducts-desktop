export const colorRows = (products) => {
    //console.log('colors:',products)
    products.map((row,index) => {
        console.log('row'+index+': ',row)
        if(row.includes('duplicate')){
            document.querySelector('#row'+index).style.backgroundColor = '#c42710'
            document.querySelector('#row'+index).style.color = '#ebde34'
        }

    })
}