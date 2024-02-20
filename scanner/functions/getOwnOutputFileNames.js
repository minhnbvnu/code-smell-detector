function getOwnOutputFileNames(configFile, inputFileName, ignoreCase, addOutput, getCommonSourceDirectory2) {
            if (isDeclarationFileName(inputFileName))
                return;
            const js = getOutputJSFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2);
            addOutput(js);
            if (fileExtensionIs(inputFileName, ".json" /* Json */))
                return;
            if (js && configFile.options.sourceMap) {
                addOutput(`${js}.map`);
            }
            if (getEmitDeclarations(configFile.options)) {
                const dts = getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2);
                addOutput(dts);
                if (configFile.options.declarationMap) {
                    addOutput(`${dts}.map`);
                }
            }
        }