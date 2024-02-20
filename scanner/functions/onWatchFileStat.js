function onWatchFileStat(watchedFile, pollIndex2, fileChanged) {
                    if (fileChanged) {
                        watchedFile.unchangedPolls = 0;
                        if (queue !== changedFilesInLastPoll) {
                            queue[pollIndex2] = void 0;
                            addChangedFileToLowPollingIntervalQueue(watchedFile);
                        }
                    }
                    else if (watchedFile.unchangedPolls !== unchangedPollThresholds[pollingInterval]) {
                        watchedFile.unchangedPolls++;
                    }
                    else if (queue === changedFilesInLastPoll) {
                        watchedFile.unchangedPolls = 1;
                        queue[pollIndex2] = void 0;
                        addToPollingIntervalQueue(watchedFile, 250 /* Low */);
                    }
                    else if (pollingInterval !== 2e3 /* High */) {
                        watchedFile.unchangedPolls++;
                        queue[pollIndex2] = void 0;
                        addToPollingIntervalQueue(watchedFile, pollingInterval === 250 /* Low */ ? 500 /* Medium */ : 2e3 /* High */);
                    }
                }