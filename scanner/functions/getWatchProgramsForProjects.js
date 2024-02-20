function getWatchProgramsForProjects(parseSettings) {
        const filePath = (0, shared_1.getCanonicalFileName)(parseSettings.filePath);
        const results = [];
        // preserve reference to code and file being linted
        currentLintOperationState.code = parseSettings.code;
        currentLintOperationState.filePath = filePath;
        // Update file version if necessary
        const fileWatchCallbacks = fileWatchCallbackTrackingMap.get(filePath);
        const codeHash = (0, shared_1.createHash)(parseSettings.code);
        if (parsedFilesSeenHash.get(filePath) !== codeHash &&
            fileWatchCallbacks &&
            fileWatchCallbacks.size > 0) {
            fileWatchCallbacks.forEach(cb => cb(filePath, ts.FileWatcherEventKind.Changed));
        }
        const currentProjectsFromSettings = new Set(parseSettings.projects);
        /*
         * before we go into the process of attempting to find and update every program
         * see if we know of a program that contains this file
         */
        for (const [tsconfigPath, existingWatch] of knownWatchProgramMap.entries()) {
            if (!currentProjectsFromSettings.has(tsconfigPath)) {
                // the current parser run doesn't specify this tsconfig in parserOptions.project
                // so we don't want to consider it for caching purposes.
                //
                // if we did consider it we might return a program for a project
                // that wasn't specified in the current parser run (which is obv bad!).
                continue;
            }
            let fileList = programFileListCache.get(tsconfigPath);
            let updatedProgram = null;
            if (!fileList) {
                updatedProgram = existingWatch.getProgram().getProgram();
                fileList = updateCachedFileList(tsconfigPath, updatedProgram, parseSettings);
            }
            if (fileList.has(filePath)) {
                log('Found existing program for file. %s', filePath);
                updatedProgram =
                    updatedProgram !== null && updatedProgram !== void 0 ? updatedProgram : existingWatch.getProgram().getProgram();
                // sets parent pointers in source files
                updatedProgram.getTypeChecker();
                return [updatedProgram];
            }
        }
        log('File did not belong to any existing programs, moving to create/update. %s', filePath);
        /*
         * We don't know of a program that contains the file, this means that either:
         * - the required program hasn't been created yet, or
         * - the file is new/renamed, and the program hasn't been updated.
         */
        for (const tsconfigPath of parseSettings.projects) {
            const existingWatch = knownWatchProgramMap.get(tsconfigPath);
            if (existingWatch) {
                const updatedProgram = maybeInvalidateProgram(existingWatch, filePath, tsconfigPath);
                if (!updatedProgram) {
                    continue;
                }
                // sets parent pointers in source files
                updatedProgram.getTypeChecker();
                // cache and check the file list
                const fileList = updateCachedFileList(tsconfigPath, updatedProgram, parseSettings);
                if (fileList.has(filePath)) {
                    log('Found updated program for file. %s', filePath);
                    // we can return early because we know this program contains the file
                    return [updatedProgram];
                }
                results.push(updatedProgram);
                continue;
            }
            const programWatch = createWatchProgram(tsconfigPath, parseSettings);
            knownWatchProgramMap.set(tsconfigPath, programWatch);
            const program = programWatch.getProgram().getProgram();
            // sets parent pointers in source files
            program.getTypeChecker();
            // cache and check the file list
            const fileList = updateCachedFileList(tsconfigPath, program, parseSettings);
            if (fileList.has(filePath)) {
                log('Found program for file. %s', filePath);
                // we can return early because we know this program contains the file
                return [program];
            }
            results.push(program);
        }
        return results;
    }