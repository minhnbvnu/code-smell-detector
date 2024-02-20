function getOutputPathsForBundle(options, forceDtsPaths) {
            const outPath = outFile(options);
            const jsFilePath = options.emitDeclarationOnly ? void 0 : outPath;
            const sourceMapFilePath = jsFilePath && getSourceMapFilePath(jsFilePath, options);
            const declarationFilePath = forceDtsPaths || getEmitDeclarations(options) ? removeFileExtension(outPath) + ".d.ts" /* Dts */ : void 0;
            const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : void 0;
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
            return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath };
        }