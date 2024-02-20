function fsRealPathHandlingLongPath(path) {
                            return path.length < 260 ? _fs.realpathSync.native(path) : _fs.realpathSync(path);
                        }