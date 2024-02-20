function getOutputDeclarationFileName(inputFileName, configFile, ignoreCase, getCommonSourceDirectory2) {
            return changeExtension(getOutputPathWithoutChangingExt(inputFileName, configFile, ignoreCase, configFile.options.declarationDir || configFile.options.outDir, getCommonSourceDirectory2), getDeclarationEmitExtensionForPath(inputFileName));
        }