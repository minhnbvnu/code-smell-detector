function phantomWrite(path, filename, text) {
                // turn filename into a qualified path
                filename = getQualifiedFilename(window.fs_path_separator);
                // write via a method injected by phantomjs-testrunner.js
                __phantom_writeFile(filename, text);
            }