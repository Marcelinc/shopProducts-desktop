export const check4duplicates = (actualData,fetchedData) => {
    let actual = actualData
    let fetched = fetchedData
    var duplicates = 0

    fetched.map(fetchedRow => {
        //console.log('fetchedrow: ',fetchedRow)

        //if(fetchedRow.includes('modified') || fetchedRow.includes('duplicate'))
            //fetchedRow.pop()

        //for fetched row from file/db check if exists in fetched data previously
        actual.filter(actualRow => {
            //console.log('actualRow: ',actualRow)
            //actualRow.sort()
            //fetchedRow.sort()
            //if(actualRow.includes('modified') || actualRow.includes('duplicate'))
            //    actualRow.pop()


            if(JSON.stringify(actualRow) === JSON.stringify(fetchedRow)){
                duplicates = duplicates+1
                fetchedRow.push('duplicate')
            } 
        })
    })

    return duplicates
}