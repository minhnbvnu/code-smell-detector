function fn6() {

    const readFileThunk = thunkify(fs.readFile)
    const fileName1 = path.resolve(__dirname, '../data/data1.json')
    const fileName2 = path.resolve(__dirname, '../data/data2.json')
    const gen = function* () {
        const r1 = yield readFileThunk(fileName1)
        console.log(111, r1.toString())
        const r2 = yield readFileThunk(fileName2)
        console.log(222, r2.toString())
    }

    const g = gen()

    g.next().value((err, data1) => {
        g.next(data1).value((err, data2) => {
            g.next(data2)
        })
    })

}