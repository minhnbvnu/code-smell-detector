function updateMissingFilePathsWatch(program, missingFileWatches, createMissingFileWatch) {
            const missingFilePaths = program.getMissingFilePaths();
            const newMissingFilePathMap = arrayToMap(missingFilePaths, identity, returnTrue);
            mutateMap(missingFileWatches, newMissingFilePathMap, {
                // Watch the missing files
                createNewValue: createMissingFileWatch,
                // Files that are no longer missing (e.g. because they are no longer required)
                // should no longer be watched.
                onDeleteValue: closeFileWatcher
            });
        }