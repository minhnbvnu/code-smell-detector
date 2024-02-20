function buildApp(options) {
    return new Bluebird(function (resolve, reject) {
        var compiler = getCompiler(options)
        compiler.run(function (err, stats) {
            if (err) return reject(err)
            if (stats.hasErrors()) return reject(new Bluebird.OperationalError(stats.toJson().errors))
            return resolve()
        })
    })
}