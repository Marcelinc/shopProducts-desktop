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
                        manufacturer: [product[0]],
                        screen: [{
                            $: {touch: product[4]},
                            resolution: [product[2]],
                            size: [product[1]],
                            type: [product[3]]
                        }],
                        processor: [{
                            name: [product[5]],
                            physical_cores: [product[6]],
                            clock_speed: [product[7]]
                        }],
                        ram: [product[8]],
                        disc: [
                            {
                                $: {type: product[10]},
                                storage: [product[9]]
                            }
                        ],
                        graphic_card:[{
                            name: product[11],
                            memory: [product[12]]
                        }],
                        os: [product[13]],
                        disc_reader: [product[14]]
                    }
                })
            
        }
    }
    return objProducts
}