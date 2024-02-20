function createTopLevelPythonModuleFile() {

    const ignorePyFiles = [
        '**/__init__.py',
        'install.py',
        'sage.py'
    ];

    const ignoreDocFiles = [
        'enums',
        'pythreejs',
        'traits',
        '_package',
        '_version',
    ];

    const modules = [];

    return mapPromiseFnOverGlob('**/*.py', function(filePath) {

        const modulePath = path.dirname(filePath);
        const moduleName = path.basename(filePath, '.py').replace(/\./g, '_');

        // check for override module.
        // for py files, the override subclasses the autogen class, so we should
        // only import the override in our __init__.py file
        if (/autogen/.test(moduleName)) {
            const overrideName = moduleName.replace('_autogen', '');
            const overridePath = path.resolve(pySrcDir, modulePath, overrideName + '.py');
            if (fse.existsSync(overridePath)) {
                console.log('Python override exists: ' + overrideName + '. Skipping...');
                return;
            }
        }

        // convert relative path to python-style import path
        let importPath;
        if (modulePath !== '.') {
            importPath = '.' + modulePath.split(pathSep).join('.') + '.' + moduleName;
        } else {
            importPath = '.' + moduleName;
        }

        let docPath;
        if (ignoreDocFiles.indexOf(moduleName) === -1) {
            docPath = filePath.replace('_autogen', '').replace('.py', '') + '_autogen';
        } else {
            docPath = '';
        }

        modules.push({
            pyRelativePath: importPath,
            docRelativePath: docPath,
        });

    }, {
        cwd: pySrcDir,
        nodir: true,
        ignore: ignorePyFiles,
    }).then(function() {

        // render template
        const context = {
            generatorScriptName: path.basename(__filename),
            now: new Date(),
            modules: modules,
        };
        const output = pyTopLevelInitTemplate(context);
        const outFilePath = path.resolve(pySrcDir, '__init__.py');

        return fse.outputFile(outFilePath, output);

    });

}