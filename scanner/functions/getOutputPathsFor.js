function getOutputPathsFor(sourceFile, host, forceDtsPaths) {
            const options = host.getCompilerOptions();
            if (sourceFile.kind === 309 /* Bundle */) {
                return getOutputPathsForBundle(options, forceDtsPaths);
            }
            else {
                const ownOutputFilePath = getOwnEmitOutputFilePath(sourceFile.fileName, host, getOutputExtension(sourceFile.fileName, options));
                const isJsonFile = isJsonSourceFile(sourceFile);
                const isJsonEmittedToSameLocation = isJsonFile && comparePaths(sourceFile.fileName, ownOutputFilePath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames()) === 0 /* EqualTo */;
                const jsFilePath = options.emitDeclarationOnly || isJsonEmittedToSameLocation ? void 0 : ownOutputFilePath;
                const sourceMapFilePath = !jsFilePath || isJsonSourceFile(sourceFile) ? void 0 : getSourceMapFilePath(jsFilePath, options);
                const declarationFilePath = forceDtsPaths || getEmitDeclarations(options) && !isJsonFile ? getDeclarationEmitOutputFilePath(sourceFile.fileName, host) : void 0;
                const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : void 0;
                return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath: void 0 };
            }
        }