function isEmittedFile(file) {
                if (options.noEmit) {
                    return false;
                }
                const filePath = toPath3(file);
                if (getSourceFileByPath(filePath)) {
                    return false;
                }
                const out = outFile(options);
                if (out) {
                    return isSameFile(filePath, out) || isSameFile(filePath, removeFileExtension(out) + ".d.ts" /* Dts */);
                }
                if (options.declarationDir && containsPath(options.declarationDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames())) {
                    return true;
                }
                if (options.outDir) {
                    return containsPath(options.outDir, filePath, currentDirectory, !host.useCaseSensitiveFileNames());
                }
                if (fileExtensionIsOneOf(filePath, supportedJSExtensionsFlat) || isDeclarationFileName(filePath)) {
                    const filePathWithoutExtension = removeFileExtension(filePath);
                    return !!getSourceFileByPath(filePathWithoutExtension + ".ts" /* Ts */) || !!getSourceFileByPath(filePathWithoutExtension + ".tsx" /* Tsx */);
                }
                return false;
            }