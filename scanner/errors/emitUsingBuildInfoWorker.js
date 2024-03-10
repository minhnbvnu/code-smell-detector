function emitUsingBuildInfoWorker(config, host, getCommandLine, customTransformers) {
            const { buildInfoPath, jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath } = getOutputPathsForBundle(config.options, 
            /*forceDtsPaths*/
            false);
            const buildInfo = host.getBuildInfo(buildInfoPath, config.options.configFilePath);
            if (!buildInfo)
                return buildInfoPath;
            if (!buildInfo.bundle || !buildInfo.bundle.js || declarationFilePath && !buildInfo.bundle.dts)
                return buildInfoPath;
            const jsFileText = host.readFile(Debug.checkDefined(jsFilePath));
            if (!jsFileText)
                return jsFilePath;
            if (computeSignature(jsFileText, host) !== buildInfo.bundle.js.hash)
                return jsFilePath;
            const sourceMapText = sourceMapFilePath && host.readFile(sourceMapFilePath);
            if (sourceMapFilePath && !sourceMapText || config.options.inlineSourceMap)
                return sourceMapFilePath || "inline sourcemap decoding";
            if (sourceMapFilePath && computeSignature(sourceMapText, host) !== buildInfo.bundle.js.mapHash)
                return sourceMapFilePath;
            const declarationText = declarationFilePath && host.readFile(declarationFilePath);
            if (declarationFilePath && !declarationText)
                return declarationFilePath;
            if (declarationFilePath && computeSignature(declarationText, host) !== buildInfo.bundle.dts.hash)
                return declarationFilePath;
            const declarationMapText = declarationMapPath && host.readFile(declarationMapPath);
            if (declarationMapPath && !declarationMapText || config.options.inlineSourceMap)
                return declarationMapPath || "inline sourcemap decoding";
            if (declarationMapPath && computeSignature(declarationMapText, host) !== buildInfo.bundle.dts.mapHash)
                return declarationMapPath;
            const buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
            const ownPrependInput = createInputFilesWithFileTexts(jsFilePath, jsFileText, sourceMapFilePath, sourceMapText, declarationFilePath, declarationText, declarationMapPath, declarationMapText, buildInfoPath, buildInfo, 
            /*onlyOwnText*/
            true);
            const outputFiles = [];
            const prependNodes = createPrependNodes(config.projectReferences, getCommandLine, (f) => host.readFile(f), host);
            const sourceFilesForJsEmit = createSourceFilesFromBundleBuildInfo(buildInfo.bundle, buildInfoDirectory, host);
            let changedDtsText;
            let changedDtsData;
            const emitHost = {
                getPrependNodes: memoize(() => [...prependNodes, ownPrependInput]),
                getCanonicalFileName: host.getCanonicalFileName,
                getCommonSourceDirectory: () => getNormalizedAbsolutePath(buildInfo.bundle.commonSourceDirectory, buildInfoDirectory),
                getCompilerOptions: () => config.options,
                getCurrentDirectory: () => host.getCurrentDirectory(),
                getSourceFile: returnUndefined,
                getSourceFileByPath: returnUndefined,
                getSourceFiles: () => sourceFilesForJsEmit,
                getLibFileFromReference: notImplemented,
                isSourceFileFromExternalLibrary: returnFalse,
                getResolvedProjectReferenceToRedirect: returnUndefined,
                getProjectReferenceRedirect: returnUndefined,
                isSourceOfProjectReferenceRedirect: returnFalse,
                writeFile: (name, text, writeByteOrderMark, _onError, _sourceFiles, data) => {
                    switch (name) {
                        case jsFilePath:
                            if (jsFileText === text)
                                return;
                            break;
                        case sourceMapFilePath:
                            if (sourceMapText === text)
                                return;
                            break;
                        case buildInfoPath:
                            break;
                        case declarationFilePath:
                            if (declarationText === text)
                                return;
                            changedDtsText = text;
                            changedDtsData = data;
                            break;
                        case declarationMapPath:
                            if (declarationMapText === text)
                                return;
                            break;
                        default:
                            Debug.fail(`Unexpected path: ${name}`);
                    }
                    outputFiles.push({ name, text, writeByteOrderMark, data });
                },
                isEmitBlocked: returnFalse,
                readFile: (f) => host.readFile(f),
                fileExists: (f) => host.fileExists(f),
                useCaseSensitiveFileNames: () => host.useCaseSensitiveFileNames(),
                getBuildInfo: (bundle) => {
                    const program = buildInfo.program;
                    if (program && changedDtsText !== void 0 && config.options.composite) {
                        program.outSignature = computeSignature(changedDtsText, host, changedDtsData);
                    }
                    const { js, dts, sourceFiles } = buildInfo.bundle;
                    bundle.js.sources = js.sources;
                    if (dts) {
                        bundle.dts.sources = dts.sources;
                    }
                    bundle.sourceFiles = sourceFiles;
                    return createBuildInfo(program, bundle);
                },
                getSourceFileFromReference: returnUndefined,
                redirectTargetsMap: createMultiMap(),
                getFileIncludeReasons: notImplemented,
                createHash: maybeBind(host, host.createHash)
            };
            emitFiles(notImplementedResolver, emitHost, 
            /*targetSourceFile*/
            void 0, getTransformers(config.options, customTransformers));
            return outputFiles;
        }