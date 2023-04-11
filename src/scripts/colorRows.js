export const colorRows = (products) => {
    console.log('colors:',products)
    products.map((row,index) => {
        if(!row.includes('modified') && !row.includes('duplicate')){
            document.querySelector('#row'+index).style.backgroundColor = '#4e4a4a'
            document.querySelector('#row'+index).style.color = '#1ee793'
            //console.log('row'+index)
        }

        if(row.includes('duplicate')){
            document.querySelector('#row'+index).style.backgroundColor = '#c42710'
            document.querySelector('#row'+index).style.color = '#ebde34'
        }

        if(row.includes('modified')){
            document.querySelector('#row'+index).style.backgroundColor = 'white'
            document.querySelector('#row'+index).style.color = 'black'
        }

    })
}