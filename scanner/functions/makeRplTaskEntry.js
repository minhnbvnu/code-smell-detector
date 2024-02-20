function makeRplTaskEntry(entry, settings) {
        return (done) => {
            if (!entry.dirent.isSymbolicLink()) {
                done(null, entry);
                return;
            }
            settings.fs.stat(entry.path, (statError, stats) => {
                if (statError !== null) {
                    if (settings.throwErrorOnBrokenSymbolicLink) {
                        done(statError);
                        return;
                    }
                    done(null, entry);
                    return;
                }
                entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
                done(null, entry);
            });
        };
    }