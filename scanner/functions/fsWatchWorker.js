function fsWatchWorker(fileOrDirectory, recursive, callback) {
                            return _fs.watch(fileOrDirectory, fsSupportsRecursiveFsWatch ? { persistent: true, recursive: !!recursive } : { persistent: true }, callback);
                        }