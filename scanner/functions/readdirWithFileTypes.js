function readdirWithFileTypes(directory, settings) {
        const dirents = settings.fs.readdirSync(directory, { withFileTypes: true });
        return dirents.map((dirent) => {
            const entry = {
                dirent,
                name: dirent.name,
                path: common.joinPathSegments(directory, dirent.name, settings.pathSegmentSeparator)
            };
            if (entry.dirent.isSymbolicLink() && settings.followSymbolicLinks) {
                try {
                    const stats = settings.fs.statSync(entry.path);
                    entry.dirent = utils.fs.createDirentFromStats(entry.name, stats);
                }
                catch (error) {
                    if (settings.throwErrorOnBrokenSymbolicLink) {
                        throw error;
                    }
                }
            }
            return entry;
        });
    }