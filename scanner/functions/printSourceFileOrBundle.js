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