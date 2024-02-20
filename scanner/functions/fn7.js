function fn7() {
    // 自动流程管理的函数
    function run(generator) {
        const gen = generator()
        function next(err, data) {
            const result = gen.next(data)  // 返回 { value: [Function], done: ... }
            if (result.done) {
                // result.done 表示是否结束
                return
            }
            result.value(next)  // result.value 是一个 thunk 函数

            // 思考：如果 yield 后面不是 thunk 函数而是 promise 对象，上一句的 result.value(next) 就可以变为 result.value.then(next) 
        }
        next() // 手动执行以启动第一次 next
    }

    const readFileThunk = thunkify(fs.readFile)
    const fileName1 = path.resolve(__dirname, '../data/data1.json')
    const fileName2 = path.resolve(__dirname, '../data/data2.json')
    const gen = function* () {
        const r1 = yield readFileThunk(fileName1)
        console.log(111, r1.toString())
        const r2 = yield readFileThunk(fileName2)
        console.log(222, r2.toString())
    }

    // run(gen)

    const c = co(gen)
    c.then(data => {
        console.log('结束')
    })

}