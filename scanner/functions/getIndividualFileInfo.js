function getIndividualFileInfo(pp, files, loopInfo, callback, $index) {
        parsePath(paths.posix.join(pp.uiPath, files[$index]), (ipp) => {
            getinfo(ipp, (result) => {
            loopInfo.results.push(result);
            if ($index + 1 >= loopInfo.total) {
                callback(loopInfo.results);
            }// if
        });// getinfo
    });// parsePath
    }