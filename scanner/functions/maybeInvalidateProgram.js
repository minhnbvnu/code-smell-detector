function maybeInvalidateProgram(existingWatch, filePath, tsconfigPath) {
        /*
         * By calling watchProgram.getProgram(), it will trigger a resync of the program based on
         * whatever new file content we've given it from our input.
         */
        let updatedProgram = existingWatch.getProgram().getProgram();
        // In case this change causes problems in larger real world codebases
        // Provide an escape hatch so people don't _have_ to revert to an older version
        if (process.env.TSESTREE_NO_INVALIDATION === 'true') {
            return updatedProgram;
        }
        if (hasTSConfigChanged(tsconfigPath)) {
            /*
             * If the stat of the tsconfig has changed, that could mean the include/exclude/files lists has changed
             * We need to make sure typescript knows this so it can update appropriately
             */
            log('tsconfig has changed - triggering program update. %s', tsconfigPath);
            fileWatchCallbackTrackingMap
                .get(tsconfigPath)
                .forEach(cb => cb(tsconfigPath, ts.FileWatcherEventKind.Changed));
            // tsconfig change means that the file list more than likely changed, so clear the cache
            programFileListCache.delete(tsconfigPath);
        }
        let sourceFile = updatedProgram.getSourceFile(filePath);
        if (sourceFile) {
            return updatedProgram;
        }
        /*
         * Missing source file means our program's folder structure might be out of date.
         * So we need to tell typescript it needs to update the correct folder.
         */
        log('File was not found in program - triggering folder update. %s', filePath);
        // Find the correct directory callback by climbing the folder tree
        const currentDir = (0, shared_1.canonicalDirname)(filePath);
        let current = null;
        let next = currentDir;
        let hasCallback = false;
        while (current !== next) {
            current = next;
            const folderWatchCallbacks = folderWatchCallbackTrackingMap.get(current);
            if (folderWatchCallbacks) {
                folderWatchCallbacks.forEach(cb => {
                    if (currentDir !== current) {
                        cb(currentDir, ts.FileWatcherEventKind.Changed);
                    }
                    cb(current, ts.FileWatcherEventKind.Changed);
                });
                hasCallback = true;
            }
            next = (0, shared_1.canonicalDirname)(current);
        }
        if (!hasCallback) {
            /*
             * No callback means the paths don't matchup - so no point returning any program
             * this will signal to the caller to skip this program
             */
            log('No callback found for file, not part of this program. %s', filePath);
            return null;
        }
        // directory update means that the file list more than likely changed, so clear the cache
        programFileListCache.delete(tsconfigPath);
        // force the immediate resync
        updatedProgram = existingWatch.getProgram().getProgram();
        sourceFile = updatedProgram.getSourceFile(filePath);
        if (sourceFile) {
            return updatedProgram;
        }
        /*
         * At this point we're in one of two states:
         * - The file isn't supposed to be in this program due to exclusions
         * - The file is new, and was renamed from an old, included filename
         *
         * For the latter case, we need to tell typescript that the old filename is now deleted
         */
        log('File was still not found in program after directory update - checking file deletions. %s', filePath);
        const rootFilenames = updatedProgram.getRootFileNames();
        // use find because we only need to "delete" one file to cause typescript to do a full resync
        const deletedFile = rootFilenames.find(file => !fs_1.default.existsSync(file));
        if (!deletedFile) {
            // There are no deleted files, so it must be the former case of the file not belonging to this program
            return null;
        }
        const fileWatchCallbacks = fileWatchCallbackTrackingMap.get((0, shared_1.getCanonicalFileName)(deletedFile));
        if (!fileWatchCallbacks) {
            // shouldn't happen, but just in case
            log('Could not find watch callbacks for root file. %s', deletedFile);
            return updatedProgram;
        }
        log('Marking file as deleted. %s', deletedFile);
        fileWatchCallbacks.forEach(cb => cb(deletedFile, ts.FileWatcherEventKind.Deleted));
        // deleted files means that the file list _has_ changed, so clear the cache
        programFileListCache.delete(tsconfigPath);
        updatedProgram = existingWatch.getProgram().getProgram();
        sourceFile = updatedProgram.getSourceFile(filePath);
        if (sourceFile) {
            return updatedProgram;
        }
        log('File was still not found in program after deletion check, assuming it is not part of this program. %s', filePath);
        return null;
    }