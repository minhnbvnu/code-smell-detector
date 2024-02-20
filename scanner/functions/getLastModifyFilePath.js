function getLastModifyFilePath(dir) {
    var filePath = '';

    if (fs.existsSync(dir)) {
        var lastmtime = 0;

        var arr = fs.readdirSync(dir);

        arr.forEach(function (item) {
            var fullpath = path.join(dir, item);
            var stats = fs.statSync(fullpath);
            if (stats.isFile()) {
                if (stats.mtimeMs >= lastmtime) {
                    filePath = fullpath;
                }
            }
        });
    }
    return filePath;
}