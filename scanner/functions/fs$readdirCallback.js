function fs$readdirCallback(path, options, cb, startTime) {
                return function (err, files) {
                    if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
                        enqueue([
                            go$readdir,
                            [path, options, cb],
                            err,
                            startTime || Date.now(),
                            Date.now()
                        ]);
                    else {
                        if (files && files.sort)
                            files.sort();
                        if (typeof cb === 'function')
                            cb.call(this, err, files);
                    }
                };
            }