function readfolder(pp, callback) {
        fs.readdir(pp.osFullPath, (err, files) => {
            if (err) {
                console.log('err -> ', err); // eslint-disable-line no-console
                callback(errors(err));
            } else {
                const loopInfo = {
                    results: [],
                    total: files.length,
                };

        if (loopInfo.total === 0) {
            callback(loopInfo.results);
        }

        for (let i = 0; i < loopInfo.total; i++) {
            getIndividualFileInfo(pp, files, loopInfo, callback, i);
        }// for
    }// if
    });// fs.readdir
    }