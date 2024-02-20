function watchLayout(options) {
    var watchpack = new Watchpack()
    var files = [
        path.resolve(options.schema),
    ]
    var dirs = [
        path.resolve(options.source),
    ]
    watchpack.on('aggregated', buildLayout.bind(undefined, options))
    watchpack.watch(files, dirs)
}