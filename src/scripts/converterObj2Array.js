export const converterObj2Array = (data) => {
    let productsArray = []
    //console.log(data)
    data.map(d => {
        //console.log(d.disc[0].$.type)
        productsArray.push([
            d.manufacturer[0],
            d.screen[0].size[0],
            d.screen[0].resolution[0],
            d.screen[0].type[0],
            d.screen[0].$ ? d.screen[0].$.touch : '',
            d.processor[0].name[0],
            d.processor[0].physical_cores[0],
            d.processor[0].clock_speed[0],
            d.ram[0],
            d.disc[0].storage[0],
            d.disc[0].$ ? d.disc[0].$.type : '',
            d.graphic_card[0].name[0],
            d.graphic_card[0].memory[0],
            d.os[0],
            d.disc_reader[0]
        ])
    })
    console.log(productsArray)

    return productsArray
}