function emitFiles(resolver, host, targetSourceFile, { scriptTransformers, declarationTransformers }, emitOnly, onlyBuildInfo, forceDtsEmit) {
            var compilerOptions = host.getCompilerOptions();
            var sourceMapDataList = compilerOptions.sourceMap || compilerOptions.inlineSourceMap || getAreDeclarationMapsEnabled(compilerOptions) ? [] : void 0;
            var emittedFilesList = compilerOptions.listEmittedFiles ? [] : void 0;
            var emitterDiagnostics = createDiagnosticCollection();
            var newLine = getNewLineCharacter(compilerOptions);
            var writer = createTextWriter(newLine);
            var { enter, exit } = createTimer("printTime", "beforePrint", "afterPrint");
            var bundleBuildInfo;
            var emitSkipped = false;
            enter();
            forEachEmittedFile(host, emitSourceFileOrBundle, getSourceFilesToEmit(host, targetSourceFile, forceDtsEmit), forceDtsEmit, onlyBuildInfo, !targetSourceFile);
            exit();
            return {
                emitSkipped,
                diagnostics: emitterDiagnostics.getDiagnostics(),
                emittedFiles: emittedFilesList,
                sourceMaps: sourceMapDataList
            };
            function emitSourceFileOrBundle({ jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath }, sourceFileOrBundle) {
                var _a2, _b, _c, _d, _e, _f;
                let buildInfoDirectory;
                if (buildInfoPath && sourceFileOrBundle && isBundle(sourceFileOrBundle)) {
                    buildInfoDirectory = getDirectoryPath(getNormalizedAbsolutePath(buildInfoPath, host.getCurrentDirectory()));
                    bundleBuildInfo = {
                        commonSourceDirectory: relativeToBuildInfo(host.getCommonSourceDirectory()),
                        sourceFiles: sourceFileOrBundle.sourceFiles.map((file) => relativeToBuildInfo(getNormalizedAbsolutePath(file.fileName, host.getCurrentDirectory())))
                    };
                }
                (_a2 = tracing) == null ? void 0 : _a2.push(tracing.Phase.Emit, "emitJsFileOrBundle", { jsFilePath });
                emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo);
                (_b = tracing) == null ? void 0 : _b.pop();
                (_c = tracing) == null ? void 0 : _c.push(tracing.Phase.Emit, "emitDeclarationFileOrBundle", { declarationFilePath });
                emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo);
                (_d = tracing) == null ? void 0 : _d.pop();
                (_e = tracing) == null ? void 0 : _e.push(tracing.Phase.Emit, "emitBuildInfo", { buildInfoPath });
                emitBuildInfo(bundleBuildInfo, buildInfoPath);
                (_f = tracing) == null ? void 0 : _f.pop();
                if (!emitSkipped && emittedFilesList) {
                    if (!emitOnly) {
                        if (jsFilePath) {
                            emittedFilesList.push(jsFilePath);
                        }
                        if (sourceMapFilePath) {
                            emittedFilesList.push(sourceMapFilePath);
                        }
                        if (buildInfoPath) {
                            emittedFilesList.push(buildInfoPath);
                        }
                    }
                    if (emitOnly !== 0 /* Js */) {
                        if (declarationFilePath) {
                            emittedFilesList.push(declarationFilePath);
                        }
                        if (declarationMapPath) {
                            emittedFilesList.push(declarationMapPath);
                        }
                    }
                }
                function relativeToBuildInfo(path) {
                    return ensurePathIsNonModuleName(getRelativePathFromDirectory(buildInfoDirectory, path, host.getCanonicalFileName));
                }
            }
            function emitBuildInfo(bundle, buildInfoPath) {
                if (!buildInfoPath || targetSourceFile || emitSkipped)
                    return;
                if (host.isEmitBlocked(buildInfoPath)) {
                    emitSkipped = true;
                    return;
                }
                const buildInfo = host.getBuildInfo(bundle) || createBuildInfo(
                /*program*/
                void 0, bundle);
                writeFile(host, emitterDiagnostics, buildInfoPath, getBuildInfoText(buildInfo), 
                /*writeByteOrderMark*/
                false, 
                /*sourceFiles*/
                void 0, { buildInfo });
            }
            function emitJsFileOrBundle(sourceFileOrBundle, jsFilePath, sourceMapFilePath, relativeToBuildInfo) {
                if (!sourceFileOrBundle || emitOnly || !jsFilePath) {
                    return;
                }
                if (host.isEmitBlocked(jsFilePath) || compilerOptions.noEmit) {
                    emitSkipped = true;
                    return;
                }
                const transform2 = transformNodes(resolver, host, factory, compilerOptions, [sourceFileOrBundle], scriptTransformers, 
                /*allowDtsFiles*/
                false);
                const printerOptions = {
                    removeComments: compilerOptions.removeComments,
                    newLine: compilerOptions.newLine,
                    noEmitHelpers: compilerOptions.noEmitHelpers,
                    module: compilerOptions.module,
                    target: compilerOptions.target,
                    sourceMap: compilerOptions.sourceMap,
                    inlineSourceMap: compilerOptions.inlineSourceMap,
                    inlineSources: compilerOptions.inlineSources,
                    extendedDiagnostics: compilerOptions.extendedDiagnostics,
                    writeBundleFileInfo: !!bundleBuildInfo,
                    relativeToBuildInfo
                };
                const printer = createPrinter(printerOptions, {
                    // resolver hooks
                    hasGlobalName: resolver.hasGlobalName,
                    // transform hooks
                    onEmitNode: transform2.emitNodeWithNotification,
                    isEmitNotificationEnabled: transform2.isEmitNotificationEnabled,
                    substituteNode: transform2.substituteNode
                });
                Debug.assert(transform2.transformed.length === 1, "Should only see one output from the transform");
                printSourceFileOrBundle(jsFilePath, sourceMapFilePath, transform2, printer, compilerOptions);
                transform2.dispose();
                if (bundleBuildInfo)
                    bundleBuildInfo.js = printer.bundleFileInfo;
            }
            function emitDeclarationFileOrBundle(sourceFileOrBundle, declarationFilePath, declarationMapPath, relativeToBuildInfo) {
                if (!sourceFileOrBundle || emitOnly === 0 /* Js */)
                    return;
                if (!declarationFilePath) {
                    if (emitOnly || compilerOptions.emitDeclarationOnly)
                        emitSkipped = true;
                    return;
                }
                const sourceFiles = isSourceFile(sourceFileOrBundle) ? [sourceFileOrBundle] : sourceFileOrBundle.sourceFiles;
                const filesForEmit = forceDtsEmit ? sourceFiles : filter(sourceFiles, isSourceFileNotJson);
                const inputListOrBundle = outFile(compilerOptions) ? [factory.createBundle(filesForEmit, !isSourceFile(sourceFileOrBundle) ? sourceFileOrBundle.prepends : void 0)] : filesForEmit;
                if (emitOnly && !getEmitDeclarations(compilerOptions)) {
                    filesForEmit.forEach(collectLinkedAliases);
                }
                const declarationTransform = transformNodes(resolver, host, factory, compilerOptions, inputListOrBundle, declarationTransformers, 
                /*allowDtsFiles*/
                false);
                if (length(declarationTransform.diagnostics)) {
                    for (const diagnostic of declarationTransform.diagnostics) {
                        emitterDiagnostics.add(diagnostic);
                    }
                }
                const printerOptions = {
                    removeComments: compilerOptions.removeComments,
                    newLine: compilerOptions.newLine,
                    noEmitHelpers: true,
                    module: compilerOptions.module,
                    target: compilerOptions.target,
                    sourceMap: !forceDtsEmit && compilerOptions.declarationMap,
                    inlineSourceMap: compilerOptions.inlineSourceMap,
                    extendedDiagnostics: compilerOptions.extendedDiagnostics,
                    onlyPrintJsDocStyle: true,
                    writeBundleFileInfo: !!bundleBuildInfo,
                    recordInternalSection: !!bundleBuildInfo,
                    relativeToBuildInfo
                };
                const declarationPrinter = createPrinter(printerOptions, {
                    // resolver hooks
                    hasGlobalName: resolver.hasGlobalName,
                    // transform hooks
                    onEmitNode: declarationTransform.emitNodeWithNotification,
                    isEmitNotificationEnabled: declarationTransform.isEmitNotificationEnabled,
                    substituteNode: declarationTransform.substituteNode
                });
                const declBlocked = !!declarationTransform.diagnostics && !!declarationTransform.diagnostics.length || !!host.isEmitBlocked(declarationFilePath) || !!compilerOptions.noEmit;
                emitSkipped = emitSkipped || declBlocked;
                if (!declBlocked || forceDtsEmit) {
                    Debug.assert(declarationTransform.transformed.length === 1, "Should only see one output from the decl transform");
                    printSourceFileOrBundle(declarationFilePath, declarationMapPath, declarationTransform, declarationPrinter, {
                        sourceMap: printerOptions.sourceMap,
                        sourceRoot: compilerOptions.sourceRoot,
                        mapRoot: compilerOptions.mapRoot,
                        extendedDiagnostics: compilerOptions.extendedDiagnostics
                        // Explicitly do not passthru either `inline` option
                    });
                }
                declarationTransform.dispose();
                if (bundleBuildInfo)
                    bundleBuildInfo.dts = declarationPrinter.bundleFileInfo;
            }
            function collectLinkedAliases(node) {
                if (isExportAssignment(node)) {
                    if (node.expression.kind === 79 /* Identifier */) {
                        resolver.collectLinkedAliases(node.expression, 
                        /*setVisibility*/
                        true);
                    }
                    return;
                }
                else if (isExportSpecifier(node)) {
                    resolver.collectLinkedAliases(node.propertyName || node.name, 
                    /*setVisibility*/
                    true);
                    return;
                }
                forEachChild(node, collectLinkedAliases);
            }
            function printSourceFileOrBundle(jsFilePath, sourceMapFilePath, transform2, printer, mapOptions) {
                const sourceFileOrBundle = transform2.transformed[0];
                const bundle = sourceFileOrBundle.kind === 309 /* Bundle */ ? sourceFileOrBundle : void 0;
                const sourceFile = sourceFileOrBundle.kind === 308 /* SourceFile */ ? sourceFileOrBundle : void 0;
                const sourceFiles = bundle ? bundle.sourceFiles : [sourceFile];
                let sourceMapGenerator;
                if (shouldEmitSourceMaps(mapOptions, sourceFileOrBundle)) {
                    sourceMapGenerator = createSourceMapGenerator(host, getBaseFileName(normalizeSlashes(jsFilePath)), getSourceRoot(mapOptions), getSourceMapDirectory(mapOptions, jsFilePath, sourceFile), mapOptions);
                }
                if (bundle) {
                    printer.writeBundle(bundle, writer, sourceMapGenerator);
                }
                else {
                    printer.writeFile(sourceFile, writer, sourceMapGenerator);
                }
                let sourceMapUrlPos;
                if (sourceMapGenerator) {
                    if (sourceMapDataList) {
                        sourceMapDataList.push({
                            inputSourceFileNames: sourceMapGenerator.getSources(),
                            sourceMap: sourceMapGenerator.toJSON()
                        });
                    }
                    const sourceMappingURL = getSourceMappingURL(mapOptions, sourceMapGenerator, jsFilePath, sourceMapFilePath, sourceFile);
                    if (sourceMappingURL) {
                        if (!writer.isAtStartOfLine())
                            writer.rawWrite(newLine);
                        sourceMapUrlPos = writer.getTextPos();
                        writer.writeComment(`//# ${"sourceMappingURL"}=${sourceMappingURL}`);
                    }
                    if (sourceMapFilePath) {
                        const sourceMap = sourceMapGenerator.toString();
                        writeFile(host, emitterDiagnostics, sourceMapFilePath, sourceMap, 
                        /*writeByteOrderMark*/
                        false, sourceFiles);
                        if (printer.bundleFileInfo)
                            printer.bundleFileInfo.mapHash = computeSignature(sourceMap, host);
                    }
                }
                else {
                    writer.writeLine();
                }
                const text = writer.getText();
                writeFile(host, emitterDiagnostics, jsFilePath, text, !!compilerOptions.emitBOM, sourceFiles, { sourceMapUrlPos, diagnostics: transform2.diagnostics });
                if (printer.bundleFileInfo)
                    printer.bundleFileInfo.hash = computeSignature(text, host);
                writer.clear();
            }
            function shouldEmitSourceMaps(mapOptions, sourceFileOrBundle) {
                return (mapOptions.sourceMap || mapOptions.inlineSourceMap) && (sourceFileOrBundle.kind !== 308 /* SourceFile */ || !fileExtensionIs(sourceFileOrBundle.fileName, ".json" /* Json */));
            }
            function getSourceRoot(mapOptions) {
                const sourceRoot = normalizeSlashes(mapOptions.sourceRoot || "");
                return sourceRoot ? ensureTrailingDirectorySeparator(sourceRoot) : sourceRoot;
            }
            function getSourceMapDirectory(mapOptions, filePath, sourceFile) {
                if (mapOptions.sourceRoot)
                    return host.getCommonSourceDirectory();
                if (mapOptions.mapRoot) {
                    let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                    if (sourceFile) {
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                    }
                    if (getRootLength(sourceMapDir) === 0) {
                        sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                    }
                    return sourceMapDir;
                }
                return getDirectoryPath(normalizePath(filePath));
            }
            function getSourceMappingURL(mapOptions, sourceMapGenerator, filePath, sourceMapFilePath, sourceFile) {
                if (mapOptions.inlineSourceMap) {
                    const sourceMapText = sourceMapGenerator.toString();
                    const base64SourceMapText = base64encode(sys, sourceMapText);
                    return `data:application/json;base64,${base64SourceMapText}`;
                }
                const sourceMapFile = getBaseFileName(normalizeSlashes(Debug.checkDefined(sourceMapFilePath)));
                if (mapOptions.mapRoot) {
                    let sourceMapDir = normalizeSlashes(mapOptions.mapRoot);
                    if (sourceFile) {
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceFile.fileName, host, sourceMapDir));
                    }
                    if (getRootLength(sourceMapDir) === 0) {
                        sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                        return encodeURI(getRelativePathToDirectoryOrUrl(getDirectoryPath(normalizePath(filePath)), 
                        // get the relative sourceMapDir path based on jsFilePath
                        combinePaths(sourceMapDir, sourceMapFile), 
                        // this is where user expects to see sourceMap
                        host.getCurrentDirectory(), host.getCanonicalFileName, 
                        /*isAbsolutePathAnUrl*/
                        true));
                    }
                    else {
                        return encodeURI(combinePaths(sourceMapDir, sourceMapFile));
                    }
                }
                return encodeURI(sourceMapFile);
            }
        }