export const check4duplicates = (actualData,fetchedData) => {
    let actual = actualData
    let fetched = fetchedData
    var duplicates = 0

    fetched.map(fetchedRow => {
        console.log(fetchedRow)
        //for fetched row from db check if exists in fetched data previously
        actual.filter(actualRow => {
            //actualRow.sort()
            //fetchedRow.sort()

            if(JSON.stringify(actualRow) === JSON.stringify(fetchedRow)){
                duplicates = duplicates+1
                fetchedRow.push('duplicate')
            } 
        })
    })

    console.log('duplicates: ',duplicates)

    return duplicates
}