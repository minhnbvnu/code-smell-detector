function processFiles(dir, callback) {
    var errorCount = 0;
    fs.readdir(dir, function(err, list) {
        if (err) {
            console.log('processFiles err: ' + err);
            return;
        }
        async.eachSeries(list, function(file, innercallback) {
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if(!stat.isDirectory()) {
                    if(path.extname(file) === ".js") {
                        lintFile(file, function(hasError) {
                            if(hasError) {
                                errorCount++;
                            }
                            innercallback();
                        });
                    } else {
                        innercallback();
                    }
                } else {
                    innercallback();
                }
            });
        }, function(error) {
            if(errorCount > 0) {
                process.exit(1);
            }
        });
    });
}