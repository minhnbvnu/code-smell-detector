function templates(src, type) {
    return gulp.src(src)
        .pipe($$.each(function(content, file, callback) {
            var filename = path.basename(file.path, "." + type),
                member = /[^\w]/.test(filename) ? "['" + filename + "']" : "." + filename;

            // convert (groups of) 4 space chars at start of lines to tab(s)
            do {
                var len = content.length;
                content = content.replace(/\n((    )*)    (.*)/, "\n$1\t$3");
            } while (content.length < len);

            // quote each line and join them into a single string
            content = 'exports' + member + " = [\n'" + content
                    .replace(/\\/g, "\\\\") // escape all backslashes
                    .replace(/'/g, "\\'") // escape all single-quotes
                    .replace(/\n/g, "',\n'") + "'\n].join('\\n');\n";

            // remove possible blank line at end of each
            content = content.replace(/,\n''\n]/g, "\n]");

            callback(null, content); // the first argument is an error, if you encounter one
        }))
        .pipe($$.concat("index.js"))
        .pipe($$.header("'use strict';\n\n"))
        .pipe(gulp.dest(function(file) { return file.base; }));
}