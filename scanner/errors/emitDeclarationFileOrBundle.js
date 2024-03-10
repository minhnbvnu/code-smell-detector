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