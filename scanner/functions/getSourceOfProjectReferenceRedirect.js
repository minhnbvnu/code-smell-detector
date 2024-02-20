function getSourceOfProjectReferenceRedirect(path) {
                if (!isDeclarationFileName(path))
                    return void 0;
                if (mapFromToProjectReferenceRedirectSource === void 0) {
                    mapFromToProjectReferenceRedirectSource = /* @__PURE__ */ new Map();
                    forEachResolvedProjectReference2((resolvedRef) => {
                        const out = outFile(resolvedRef.commandLine.options);
                        if (out) {
                            const outputDts = changeExtension(out, ".d.ts" /* Dts */);
                            mapFromToProjectReferenceRedirectSource.set(toPath3(outputDts), true);
                        }
                        else {
                            const getCommonSourceDirectory3 = memoize(() => getCommonSourceDirectoryOfConfig(resolvedRef.commandLine, !host.useCaseSensitiveFileNames()));
                            forEach(resolvedRef.commandLine.fileNames, (fileName) => {
                                if (!isDeclarationFileName(fileName) && !fileExtensionIs(fileName, ".json" /* Json */)) {
                                    const outputDts = getOutputDeclarationFileName(fileName, resolvedRef.commandLine, !host.useCaseSensitiveFileNames(), getCommonSourceDirectory3);
                                    mapFromToProjectReferenceRedirectSource.set(toPath3(outputDts), fileName);
                                }
                            });
                        }
                    });
                }
                return mapFromToProjectReferenceRedirectSource.get(path);
            }