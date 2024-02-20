function watchWildCardDirectories(state, resolved, resolvedPath, parsed) {
            if (!state.watch)
                return;
            updateWatchingWildcardDirectories(getOrCreateValueMapFromConfigFileMap(state.allWatchedWildcardDirectories, resolvedPath), new Map(Object.entries(parsed.wildcardDirectories)), (dir, flags) => state.watchDirectory(dir, (fileOrDirectory) => {
                var _a2;
                if (isIgnoredFileFromWildCardWatching({
                    watchedDirPath: toPath2(state, dir),
                    fileOrDirectory,
                    fileOrDirectoryPath: toPath2(state, fileOrDirectory),
                    configFileName: resolved,
                    currentDirectory: state.compilerHost.getCurrentDirectory(),
                    options: parsed.options,
                    program: state.builderPrograms.get(resolvedPath) || ((_a2 = getCachedParsedConfigFile(state, resolvedPath)) == null ? void 0 : _a2.fileNames),
                    useCaseSensitiveFileNames: state.parseConfigFileHost.useCaseSensitiveFileNames,
                    writeLog: (s) => state.writeLog(s),
                    toPath: (fileName) => toPath2(state, fileName)
                }))
                    return;
                invalidateProjectAndScheduleBuilds(state, resolvedPath, 1 /* Partial */);
            }, flags, parsed == null ? void 0 : parsed.watchOptions, WatchType.WildcardDirectory, resolved));
        }