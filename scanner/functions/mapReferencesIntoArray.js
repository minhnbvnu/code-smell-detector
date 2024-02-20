function mapReferencesIntoArray(references2, outputFilePath2) {
                    return (file) => {
                        let declFileName;
                        if (file.isDeclarationFile) {
                            declFileName = file.fileName;
                        }
                        else {
                            if (isBundledEmit && contains(node.sourceFiles, file))
                                return;
                            const paths = getOutputPathsFor(file, host, 
                            /*forceDtsPaths*/
                            true);
                            declFileName = paths.declarationFilePath || paths.jsFilePath || file.fileName;
                        }
                        if (declFileName) {
                            const specifier = getModuleSpecifier(options, currentSourceFile, toPath(outputFilePath2, host.getCurrentDirectory(), host.getCanonicalFileName), toPath(declFileName, host.getCurrentDirectory(), host.getCanonicalFileName), host);
                            if (!pathIsRelative(specifier)) {
                                recordTypeReferenceDirectivesIfNecessary([[
                                        specifier,
                                        /*mode*/
                                        void 0
                                    ]]);
                                return;
                            }
                            let fileName = getRelativePathToDirectoryOrUrl(outputFilePath2, declFileName, host.getCurrentDirectory(), host.getCanonicalFileName, 
                            /*isAbsolutePathAnUrl*/
                            false);
                            if (startsWith(fileName, "./") && hasExtension(fileName)) {
                                fileName = fileName.substring(2);
                            }
                            if (startsWith(fileName, "node_modules/") || pathContainsNodeModules(fileName)) {
                                return;
                            }
                            references2.push({ pos: -1, end: -1, fileName });
                        }
                    };
                }