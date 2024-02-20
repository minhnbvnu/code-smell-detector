function scheduleUpdateChildWatches(dirName, dirPath, fileName, options) {
                const existing = cacheToUpdateChildWatches.get(dirPath);
                if (existing) {
                    existing.fileNames.push(fileName);
                }
                else {
                    cacheToUpdateChildWatches.set(dirPath, { dirName, options, fileNames: [fileName] });
                }
                if (timerToUpdateChildWatches) {
                    clearTimeout2(timerToUpdateChildWatches);
                    timerToUpdateChildWatches = void 0;
                }
                timerToUpdateChildWatches = setTimeout2(onTimerToUpdateChildWatches, 1e3);
            }