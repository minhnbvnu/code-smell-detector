function createPythonFiles() {

    // Prevent python file generation when outside dir (e.g. npm install in dependent)
    if (!fse.existsSync(pySrcDir)) {
        return Promise.resolve();
    }

    return mapPromiseFnOverThreeModules(
        function(relativePath) {
            return createPythonWrapper(relativePath).then(function() {
                // ensures each dir has empty __init__.py file for proper importing of sub dirs
                return createPythonModuleInitFile(relativePath);
            });
        })
        .then(function() {
            return mapPromiseFnOverFileList(CUSTOM_CLASSES, function(relativePath) {
                return createPythonWrapper(relativePath).then(function() {
                    // ensures each dir has empty __init__.py file for proper importing of sub dirs
                    return createPythonModuleInitFile(relativePath);
                });
            });
        })
        .then(function() {
            // Manually ensure base init file is created
            return createPythonModuleInitFile('_base/__init__');
        })
        .then(function() {
            return writeDocModuleFiles();
        })
        .then(function() {
            // top level __init__.py file imports *all* pythreejs modules into namespace
            return createTopLevelPythonModuleFile();
        });

}