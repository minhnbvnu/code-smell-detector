function getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2) {
            if (configFile.options.emitDeclarationOnly)
                return void 0;
            const isJsonFile = fileExtensionIs(inputFileName, ".json" /* Json */);
            const outputFileName = changeExtension(getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.outDir, getCommonSourceDirectory2), getOutputExtension(inputFileName, configFile.options));
            return !isJsonFile || comparePaths(inputFileName, outputFileName, Debug.checkDefined(configFile.options.configFilePath), ignoreCase) !== 0 /* EqualTo */ ? outputFileName : void 0;
        }