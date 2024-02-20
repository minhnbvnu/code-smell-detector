function forEachEmittedFile(host, action, sourceFilesOrTargetSourceFile, forceDtsEmit = false, onlyBuildInfo, includeBuildInfo) {
            const sourceFiles = isArray(sourceFilesOrTargetSourceFile) ? sourceFilesOrTargetSourceFile : getSourceFilesToEmit(host, sourceFilesOrTargetSourceFile, forceDtsEmit);
            const options = host.getCompilerOptions();
            if (outFile(options)) {
                const prepends = host.getPrependNodes();
                if (sourceFiles.length || prepends.length) {
                    const bundle = factory.createBundle(sourceFiles, prepends);
                    const result = action(getOutputPathsFor(bundle, host, forceDtsEmit), bundle);
                    if (result) {
                        return result;
                    }
                }
            }
            else {
                if (!onlyBuildInfo) {
                    for (const sourceFile of sourceFiles) {
                        const result = action(getOutputPathsFor(sourceFile, host, forceDtsEmit), sourceFile);
                        if (result) {
                            return result;
                        }
                    }
                }
                if (includeBuildInfo) {
                    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
                    if (buildInfoPath)
                        return action({ buildInfoPath }, 
                        /*sourceFileOrBundle*/
                        void 0);
                }
            }
        }