function writeJavascriptIndexFiles() {

    console.log('Writing javascript indices...');

    const dotSlash = '.' + path.sep;

    const excludes = [
        /\.swp$/,
        /\.DS_Store$/,
        /index\.js$/,
        dotSlash + 'embed.js',
        dotSlash + 'extension.js',
        dotSlash + path.join('examples', '.eslintrc.js'),
    ];

    // Regexp's
    const RE_AUTOGEN_EXT = /\.autogen\.js$/;

    async function writeIndexForDir(dirPath, isTopLevel) {

        const dirAbsPath = path.resolve(jsSrcDir, dirPath);

        // Generate list of files in dir to include in index.js as require lines
        let dirFiles = await fse.readdir(dirAbsPath);

        // get proper relative path for file
        dirFiles = dirFiles.map(filename => {
            return dotSlash + path.join(dirPath, filename);
        });

        // filter excluded files
        dirFiles = dirFiles.filter(filePath => {

            // ignore autogen files in _base dir
            if (/_base/.test(dirPath) && RE_AUTOGEN_EXT.test(filePath)) {
                return false;
            }

            // compare filePath to each exclude pattern
            const shouldExclude = _.any(excludes, function(testPattern) {
                if (testPattern instanceof RegExp) {
                    return testPattern.test(filePath);
                } else if (typeof testPattern === 'string') {
                    return testPattern === filePath;
                }
            });
            if (shouldExclude) {
                return false;
            }

            // if override class exists, load it in favor of the autogen file
            // e.g. for WebGLRenderer.js, Object3D.js, DataTexture.js
            // override classes should extend the autogen versions
            if (RE_AUTOGEN_EXT.test(filePath)) {

                const dirname = path.dirname(filePath);
                const basename = path.basename(filePath, JS_AUTOGEN_EXT);
                const overrideName = basename + '.js';
                const overridePath = './' + path.join(dirname, overrideName);

                // override file present, so don't include autogen file in index
                if (dirFiles.indexOf(overridePath) > -1) {
                    console.log('override exists for: ' + filePath);
                    return false;
                }

            }

            return true;
        });

        // convert file paths relative to js src dir to paths relative to dirPath
        dirFiles = dirFiles.map(function(filePath) {
            return './' + path.basename(filePath);
        });

        // render template
        const context = {
            now: new Date(),
            generatorScriptName: path.basename(__filename),
            top_level: isTopLevel,
            submodules: dirFiles,
        };
        const output = jsIndexTemplate(context);
        const outputPath = path.resolve(jsSrcDir, dirPath, 'index.js');

        return fse.outputFile(outputPath, output);
    }

    // map over all directories in js src dir
    return mapPromiseFnOverGlob(
        '**/', // trailing slash globs for dirs only
        function(dirPath) {
            return writeIndexForDir(dirPath, false);
        },
        { cwd: jsSrcDir, }
    ).then(function() {
        // write top-level index (not included in above glob)
        return writeIndexForDir('.', true);
    });

}