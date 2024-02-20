function createPythonModuleInitFile(modulePath) {

    let dirname = path.dirname(path.resolve(pySrcDir, modulePath));
    let pyInitFilePath;
    const promises = [];
    while (dirname !== pySrcDir) {
        pyInitFilePath = path.join(dirname, '__init__.py');
        promises.push(fse.ensureFile(pyInitFilePath));
        if (dirname === path.dirname(dirname)) {
            throw new Error(`${dirname}, ${path.dirname(dirname)}`);
        }
        dirname = path.dirname(dirname);
    }
    return Promise.all(promises);
}