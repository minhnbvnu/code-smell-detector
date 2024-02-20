function getFirstProjectOutput(configFile, ignoreCase) {
            if (outFile(configFile.options)) {
                const { jsFilePath, declarationFilePath } = getOutputPathsForBundle(configFile.options, 
                /*forceDtsPaths*/
                false);
                return Debug.checkDefined(jsFilePath || declarationFilePath, `project ${configFile.options.configFilePath} expected to have at least one output`);
            }
            const getCommonSourceDirectory2 = memoize(() => getCommonSourceDirectoryOfConfig(configFile, ignoreCase));
            for (const inputFileName of configFile.fileNames) {
                if (isDeclarationFileName(inputFileName))
                    continue;
                const jsFilePath = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2);
                if (jsFilePath)
                    return jsFilePath;
                if (fileExtensionIs(inputFileName, ".json" /* Json */))
                    continue;
                if (getEmitDeclarations(configFile.options)) {
                    return getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2);
                }
            }
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(configFile.options);
            if (buildInfoPath)
                return buildInfoPath;
            return Debug.fail(`project ${configFile.options.configFilePath} expected to have at least one output`);
        }