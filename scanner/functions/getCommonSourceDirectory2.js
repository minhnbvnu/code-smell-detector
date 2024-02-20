function getCommonSourceDirectory2() {
                if (commonSourceDirectory === void 0) {
                    const emittedFiles = filter(files, (file) => sourceFileMayBeEmitted(file, program));
                    commonSourceDirectory = getCommonSourceDirectory(options, () => mapDefined(emittedFiles, (file) => file.isDeclarationFile ? void 0 : file.fileName), currentDirectory, getCanonicalFileName, (commonSourceDirectory2) => checkSourceFilesBelongToPath(emittedFiles, commonSourceDirectory2));
                }
                return commonSourceDirectory;
            }