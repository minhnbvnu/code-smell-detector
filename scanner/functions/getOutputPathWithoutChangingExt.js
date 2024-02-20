function getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, outputDir, getCommonSourceDirectory2) {
            return outputDir ? resolvePath(outputDir, getRelativePathFromDirectory(getCommonSourceDirectory2 ? getCommonSourceDirectory2() : getCommonSourceDirectoryOfConfig(configFile, ignoreCase), inputFileName, ignoreCase)) : inputFileName;
        }