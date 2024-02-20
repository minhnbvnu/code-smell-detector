function closeSync(fd) {
                // This function uses the graceful-fs shared queue
                fs$closeSync.apply(fs, arguments);
                resetQueue();
            }