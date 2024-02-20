function getOutputDirectoriesForBaseDirectory(commonSourceDirGuess) {
                        var _a3, _b2;
                        const currentDir = state.compilerOptions.configFile ? ((_b2 = (_a3 = state.host).getCurrentDirectory) == null ? void 0 : _b2.call(_a3)) || "" : commonSourceDirGuess;
                        const candidateDirectories = [];
                        if (state.compilerOptions.declarationDir) {
                            candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.declarationDir)));
                        }
                        if (state.compilerOptions.outDir && state.compilerOptions.outDir !== state.compilerOptions.declarationDir) {
                            candidateDirectories.push(toAbsolutePath(combineDirectoryPath(currentDir, state.compilerOptions.outDir)));
                        }
                        return candidateDirectories;
                    }