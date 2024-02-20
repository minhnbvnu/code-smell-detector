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