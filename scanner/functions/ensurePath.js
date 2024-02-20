function ensurePath(path) {
    const dirPath = getDirPath(path);
    return fs.isDir(dirPath)
        .then(isDir => {
            if (!isDir) {
                return fs.mkdir(dirPath)
                    // check if dir has indeed been created because
                    // there's no exception on incorrect user-defined paths (?)...
                    .then(() => fs.isDir(dirPath))
                    .then(isDir => {
                        if (!isDir) {
                            throw new Error('Invalid cacheLocation');
                        }
                    })
            }
        })
        .catch(err => {
            // ignore folder already exists errors
            if (err.message.includes('folder already exists')) {
                return;
            }
            throw err;
        });
}