function updateWatcher(createWatcher) {
                    if (watcher) {
                        sysLog2(`sysLog:: ${fileOrDirectory}:: Changing watcher to ${createWatcher === watchPresentFileSystemEntry ? "Present" : "Missing"}FileSystemEntryWatcher`);
                        watcher.close();
                        watcher = createWatcher();
                    }
                }