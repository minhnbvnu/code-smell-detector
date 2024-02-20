function go$copyFile(src, dest, flags, cb, startTime) {
                return fs$copyFile(src, dest, flags, function (err) {
                    if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
                        enqueue([go$copyFile, [src, dest, flags, cb], err, startTime || Date.now(), Date.now()]);
                    else {
                        if (typeof cb === 'function')
                            cb.apply(this, arguments);
                    }
                });
            }