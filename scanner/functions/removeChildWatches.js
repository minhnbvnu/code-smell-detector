function removeChildWatches(parentWatcher) {
                if (!parentWatcher)
                    return;
                const existingChildWatches = parentWatcher.childWatches;
                parentWatcher.childWatches = emptyArray;
                for (const childWatcher of existingChildWatches) {
                    childWatcher.close();
                    removeChildWatches(cache.get(toCanonicalFilePath(childWatcher.dirName)));
                }
            }