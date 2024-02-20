function getSingleOutputFileNames(configFile, addOutput) {
            const { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath } = getOutputPathsForBundle(configFile.options, 
            /*forceDtsPaths*/
            false);
            addOutput(jsFilePath);
            addOutput(sourceMapFilePath);
            addOutput(declarationFilePath);
            addOutput(declarationMapPath);
            addOutput(buildInfoPath);
        }