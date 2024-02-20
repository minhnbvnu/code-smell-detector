function rmFileGlobAsync(globPattern) {
    return mapPromiseFnOverGlob(globPattern, function(filePath) {
        console.log(filePath);
        var absPath = path.resolve(baseDir, filePath);
        return fse.remove(absPath);
    }, {
        cwd: baseDir,
        nodir: true,
        ignore: [
            './node_modules/**'
        ]
    });
}