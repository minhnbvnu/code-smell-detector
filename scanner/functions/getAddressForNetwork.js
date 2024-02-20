function getAddressForNetwork(file, network) {
    return new Promise((res) => {
        fs.readFile(file, (error, content) => {
            if (content === undefined) {
                console.log(`File: ${file} does not exsist`)
                return
            }
            res(`${network}: ${JSON.parse(content).address}`)
        })
    })
}