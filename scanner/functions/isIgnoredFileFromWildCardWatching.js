function isIgnoredFileFromWildCardWatching({ watchedDirPath, fileOrDirectory, fileOrDirectoryPath, configFileName, options, program, extraFileExtensions, currentDirectory, useCaseSensitiveFileNames, writeLog, toPath: toPath3 }) {
            const newPath = removeIgnoredPath(fileOrDirectoryPath);
            if (!newPath) {
                writeLog(`Project: ${configFileName} Detected ignored path: ${fileOrDirectory}`);
                return true;
            }
            fileOrDirectoryPath = newPath;
            if (fileOrDirectoryPath === watchedDirPath)
                return false;
            if (hasExtension(fileOrDirectoryPath) && !isSupportedSourceFileName(fileOrDirectory, options, extraFileExtensions)) {
                writeLog(`Project: ${configFileName} Detected file add/remove of non supported extension: ${fileOrDirectory}`);
                return true;
            }
            if (isExcludedFile(fileOrDirectory, options.configFile.configFileSpecs, getNormalizedAbsolutePath(getDirectoryPath(configFileName), currentDirectory), useCaseSensitiveFileNames, currentDirectory)) {
                writeLog(`Project: ${configFileName} Detected excluded file: ${fileOrDirectory}`);
                return true;
            }
            if (!program)
                return false;
            if (outFile(options) || options.outDir)
                return false;
            if (isDeclarationFileName(fileOrDirectoryPath)) {
                if (options.declarationDir)
                    return false;
            }
            else if (!fileExtensionIsOneOf(fileOrDirectoryPath, supportedJSExtensionsFlat)) {
                return false;
            }
            const filePathWithoutExtension = removeFileExtension(fileOrDirectoryPath);
            const realProgram = isArray(program) ? void 0 : isBuilderProgram(program) ? program.getProgramOrUndefined() : program;
            const builderProgram = !realProgram && !isArray(program) ? program : void 0;
            if (hasSourceFile(filePathWithoutExtension + ".ts" /* Ts */) || hasSourceFile(filePathWithoutExtension + ".tsx" /* Tsx */)) {
                writeLog(`Project: ${configFileName} Detected output file: ${fileOrDirectory}`);
                return true;
            }
            return false;
            function hasSourceFile(file) {
                return realProgram ? !!realProgram.getSourceFileByPath(file) : builderProgram ? builderProgram.getState().fileInfos.has(file) : !!find(program, (rootFile) => toPath3(rootFile) === file);
            }
        }