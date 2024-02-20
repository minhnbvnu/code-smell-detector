function mkdir_auto_next(mode, pathlist, pathlistlength, callback, pathlistlengthseed, pathtmp) {
    callback = callback || function() {}
    if (pathlistlength > 0) {

        if (!pathlistlengthseed) {
            pathlistlengthseed = 0
        }

        if (pathlistlengthseed >= pathlistlength) {
            callback(true)
        } else {
            if (pathtmp) {
                pathtmp = path.join(pathtmp, pathlist[pathlistlengthseed])
            } else {
                pathtmp = pathlist[pathlistlengthseed]
            }

            fs.exists(pathtmp, exists => {
                if (!exists) {
                    fs.mkdir(pathtmp, mode, isok => {
                        if (!isok) {
                            mkdir_auto_next(mode, pathlist, pathlistlength, callresult => {
                                callback(callresult)
                            },
                            pathlistlengthseed + 1, pathtmp)
                        } else {
                            callback(false)
                        }
                    })
                } else {
                    mkdir_auto_next(mode, pathlist, pathlistlength, callresult => {
                        callback(callresult)
                    },
                    pathlistlengthseed + 1, pathtmp)
                }
            })
        }
    } else {
        callback(true)
    }
}