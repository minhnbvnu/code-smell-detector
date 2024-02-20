function watchInputFiles(state, resolved, resolvedPath, parsed) {
            if (!state.watch)
                return;
            mutateMap(getOrCreateValueMapFromConfigFileMap(state.allWatchedInputFiles, resolvedPath), arrayToMap(parsed.fileNames, (fileName) => toPath2(state, fileName)), {
                createNewValue: (_path, input) => watchFile(state, input, () => invalidateProjectAndScheduleBuilds(state, resolvedPath, 0 /* None */), 250 /* Low */, parsed == null ? void 0 : parsed.watchOptions, WatchType.SourceFile, resolved),
                onDeleteValue: closeFileWatcher
            });
        }