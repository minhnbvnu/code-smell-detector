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