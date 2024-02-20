function getAllProjectOutputs(configFile, ignoreCase) {
            const { addOutput, getOutputs } = createAddOutput();
            if (outFile(configFile.options)) {
                getSingleOutputFileNames(configFile, addOutput);
            }
            else {
                const getCommonSourceDirectory2 = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
                for (const inputFileName of configFile.fileNames) {
                    getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput, getCommonSourceDirectory2);
                }
                addOutput(getTsBuildInfoEmitOutputFilePath(configFile.options));
            }
            return getOutputs();
        }