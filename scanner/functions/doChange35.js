function doChange35(oldFile, program, toMove, changes, host, preferences) {
            const checker = program.getTypeChecker();
            const usage = getUsageInfo(oldFile, toMove.all, checker);
            const currentDirectory = getDirectoryPath(oldFile.fileName);
            const extension = extensionFromPath(oldFile.fileName);
            const newFilename = combinePaths(
            // new file is always placed in the same directory as the old file
            currentDirectory, 
            // ensures the filename computed below isn't already taken
            makeUniqueFilename(
            // infers a name for the new file from the symbols being moved
            inferNewFilename(usage.oldFileImportsFromNewFile, usage.movedSymbols), extension, currentDirectory, host)) + extension;
            changes.createNewFile(oldFile, newFilename, getNewStatementsAndRemoveFromOldFile(oldFile, usage, changes, toMove, program, host, newFilename, preferences));
            addNewFileToTsconfig(program, changes, oldFile.fileName, newFilename, hostGetCanonicalFileName(host));
        }