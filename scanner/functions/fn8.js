function fn8() {

    const fileName1 = path.resolve(__dirname, '../data/data1.json')
    const fileName2 = path.resolve(__dirname, '../data/data2.json')
    const readFilePromise = Q.denodeify(fs.readFile)

    const gen = function* () {
        const r1 = yield readFilePromise(fileName1)
        console.log(111, r1.toString())
        const r2 = yield readFilePromise(fileName2)
        console.log(222, r2.toString())
    }

    co(gen)
}