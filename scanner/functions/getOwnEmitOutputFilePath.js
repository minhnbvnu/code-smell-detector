function getOwnEmitOutputFilePath(fileName, host, extension) {
            const compilerOptions = host.getCompilerOptions();
            let emitOutputFilePathWithoutExtension;
            if (compilerOptions.outDir) {
                emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(fileName, host, compilerOptions.outDir));
            }
            else {
                emitOutputFilePathWithoutExtension = removeFileExtension(fileName);
            }
            return emitOutputFilePathWithoutExtension + extension;
        }