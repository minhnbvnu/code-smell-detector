function getOutputFileNames(commandLine, inputFileName, ignoreCase) {
            inputFileName = normalizePath(inputFileName);
            Debug.assert(contains(commandLine.fileNames, inputFileName), `Expected fileName to be present in command line`);
            const { addOutput, getOutputs } = createAddOutput();
            if (outFile(commandLine.options)) {
                getSingleOutputFileNames(commandLine, addOutput);
            }
            else {
                getOwnOutputFileNames(commandLine, inputFileName, ignoreCase, addOutput);
            }
            return getOutputs();
        }