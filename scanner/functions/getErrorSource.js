function getErrorSource(error) {
        var match = /\n    at [^(]+ \((.*):(\d+):(\d+)\)/.exec(error.stack);
        if (match) {
            var source = match[1];
            var line = +match[2];
            var column = +match[3];
            // Support the inline sourceContents inside the source map
            var contents = fileContentsCache[source];
            // Support files on disk
            if (!contents && fs && fs.existsSync(source)) {
                try {
                    contents = fs.readFileSync(source, 'utf8');
                }
                catch (er) {
                    contents = '';
                }
            }
            // Format the line from the original source code like node does
            if (contents) {
                var code = contents.split(/(?:\r\n|\r|\n)/)[line - 1];
                if (code) {
                    return source + ':' + line + '\n' + code + '\n' +
                        new Array(column).join(' ') + '^';
                }
            }
        }
        return null;
    }