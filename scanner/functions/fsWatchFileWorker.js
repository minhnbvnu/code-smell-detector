function fsWatchFileWorker(fileName, callback, pollingInterval) {
                            _fs.watchFile(fileName, { persistent: true, interval: pollingInterval }, fileChanged);
                            let eventKind;
                            return {
                                close: () => _fs.unwatchFile(fileName, fileChanged)
                            };
                            function fileChanged(curr, prev) {
                                const isPreviouslyDeleted = +prev.mtime === 0 || eventKind === 2 /* Deleted */;
                                if (+curr.mtime === 0) {
                                    if (isPreviouslyDeleted) {
                                        return;
                                    }
                                    eventKind = 2 /* Deleted */;
                                }
                                else if (isPreviouslyDeleted) {
                                    eventKind = 0 /* Created */;
                                }
                                else if (+curr.mtime === +prev.mtime) {
                                    return;
                                }
                                else {
                                    eventKind = 1 /* Changed */;
                                }
                                callback(fileName, eventKind, curr.mtime);
                            }
                        }