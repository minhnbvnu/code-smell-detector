function writeIndexForDir(dirPath, isTopLevel) {

        const dirAbsPath = path.resolve(docSrcDir, dirPath);
        let moduleName;
        if (dirPath === '.') {
            moduleName = 'pythreejs';
        } else {
            moduleName = path.basename(dirPath);
        }

        // Generate list of files in dir to include in module as toc entries
        return fse.readdir(dirAbsPath).then(function(dirFiles) {

            // sort directories first:
            dirFiles = _.sortBy(dirFiles, filePath => {
                return fse.statSync(path.join(dirAbsPath, filePath)).isDirectory() ? 0 : 1;
            });

            dirFiles = dirFiles.filter(filePath => {
                return !filePath.match(RE_AUTOGEN);
            });

            // convert file paths to paths relative to dirPath
            dirFiles = dirFiles.map(filePath => {
                if (fse.statSync(path.join(dirAbsPath, filePath)).isDirectory()) {
                    return `./${filePath}/index`;
                }
                // Need to use forward slash for RST:
                return `./${path.basename(filePath)}`;
            });

            // render template
            const context = {
                now: new Date(),
                generatorScriptName: path.basename(__filename),
                moduleName: moduleName,
                submodules: dirFiles,
                top_level: isTopLevel,
            };
            const output = docIndexTemplate(context);
            const outputPath = path.resolve(docSrcDir, dirPath, 'index.rst');

            return fse.outputFile(outputPath, output);

        });
    }