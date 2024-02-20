function getTsBuildInfoEmitOutputFilePath(options) {
            const configFile = options.configFilePath;
            if (!isIncrementalCompilation(options))
                return void 0;
            if (options.tsBuildInfoFile)
                return options.tsBuildInfoFile;
            const outPath = outFile(options);
            let buildInfoExtensionLess;
            if (outPath) {
                buildInfoExtensionLess = removeFileExtension(outPath);
            }
            else {
                if (!configFile)
                    return void 0;
                const configFileExtensionLess = removeFileExtension(configFile);
                buildInfoExtensionLess = options.outDir ? options.rootDir ? resolvePath(options.outDir, getRelativePathFromDirectory(options.rootDir, configFileExtensionLess, 
                /*ignoreCase*/
                true)) : combinePaths(options.outDir, getBaseFileName(configFileExtensionLess)) : configFileExtensionLess;
            }
            return buildInfoExtensionLess + ".tsbuildinfo" /* TsBuildInfo */;
        }