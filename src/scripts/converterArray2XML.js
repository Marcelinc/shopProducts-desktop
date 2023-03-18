export const converterArray2XML = arrayProducts => {

    

    let objProducts = {
        laptops: {
            $: {
                moddate: Date.now()
            },
            laptop: 
                arrayProducts.map((product,item) => {
                    console.log('pr',product)
                    return {
                        $: {
                            id: item+1
                        },
                        
                        disc: [
                            {
                                $: {type: product[10]},
                                storage: ['240GB']
                            }
                        ]
                    }
                })
            
        }
    }
    return objProducts
}