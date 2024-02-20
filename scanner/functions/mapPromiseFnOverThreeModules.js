function mapPromiseFnOverThreeModules(mapFn) {
    return mapPromiseFnOverGlob('**/*.js', mapFn, {
        cwd: threeSrcDir,
        nodir: true ,
        ignore: IGNORE_FILES,
    });
}