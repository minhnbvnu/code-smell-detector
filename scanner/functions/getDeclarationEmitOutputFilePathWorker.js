function getDeclarationEmitOutputFilePathWorker(fileName, options, currentDirectory, commonSourceDirectory, getCanonicalFileName) {
            const outputDir = options.declarationDir || options.outDir;
            const path = outputDir ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName) : fileName;
            const declarationExtension = getDeclarationEmitExtensionForPath(path);
            return removeFileExtension(path) + declarationExtension;
        }