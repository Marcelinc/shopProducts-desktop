export const converterDB2Array = (data) => {
    var dataArray = []
    //console.log('data',data)
    data.map(d => dataArray.push([
        d.manufacturer,
        d['Screen.size'],
        d['Screen.resolution'],
        d['Screen.type'],
        d['Screen.touch'] ? 'yes' : 'no',
        d['Processor.name'],
        d['Processor.physical_cores']+'',
        d['Processor.clock_speed']+'',
        d['Ram.capacity'],
        d['Disc.storage'],
        d['Disc.type'],
        d['Graphic_card.name'],
        d['Graphic_card.memory'],
        d.os,
        d.disc_reader,
        d.id,
        'DB'
    ]))

    //console.log('dataArray:',dataArray)
    return dataArray
}