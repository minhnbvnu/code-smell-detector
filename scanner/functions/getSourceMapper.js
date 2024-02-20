function getSourceMapper(host) {
            const getCanonicalFileName = createGetCanonicalFileName(host.useCaseSensitiveFileNames());
            const currentDirectory = host.getCurrentDirectory();
            const sourceFileLike = /* @__PURE__ */ new Map();
            const documentPositionMappers = /* @__PURE__ */ new Map();
            return { tryGetSourcePosition, tryGetGeneratedPosition, toLineColumnOffset, clearCache };
            function toPath3(fileName) {
                return toPath(fileName, currentDirectory, getCanonicalFileName);
            }
            function getDocumentPositionMapper2(generatedFileName, sourceFileName) {
                const path = toPath3(generatedFileName);
                const value = documentPositionMappers.get(path);
                if (value)
                    return value;
                let mapper;
                if (host.getDocumentPositionMapper) {
                    mapper = host.getDocumentPositionMapper(generatedFileName, sourceFileName);
                }
                else if (host.readFile) {
                    const file = getSourceFileLike(generatedFileName);
                    mapper = file && getDocumentPositionMapper({ getSourceFileLike, getCanonicalFileName, log: (s) => host.log(s) }, generatedFileName, getLineInfo(file.text, getLineStarts(file)), (f) => !host.fileExists || host.fileExists(f) ? host.readFile(f) : void 0);
                }
                documentPositionMappers.set(path, mapper || identitySourceMapConsumer);
                return mapper || identitySourceMapConsumer;
            }
            function tryGetSourcePosition(info) {
                if (!isDeclarationFileName(info.fileName))
                    return void 0;
                const file = getSourceFile(info.fileName);
                if (!file)
                    return void 0;
                const newLoc = getDocumentPositionMapper2(info.fileName).getSourcePosition(info);
                return !newLoc || newLoc === info ? void 0 : tryGetSourcePosition(newLoc) || newLoc;
            }
            function tryGetGeneratedPosition(info) {
                if (isDeclarationFileName(info.fileName))
                    return void 0;
                const sourceFile = getSourceFile(info.fileName);
                if (!sourceFile)
                    return void 0;
                const program = host.getProgram();
                if (program.isSourceOfProjectReferenceRedirect(sourceFile.fileName)) {
                    return void 0;
                }
                const options = program.getCompilerOptions();
                const outPath = outFile(options);
                const declarationPath = outPath ? removeFileExtension(outPath) + ".d.ts" /* Dts */ : getDeclarationEmitOutputFilePathWorker(info.fileName, program.getCompilerOptions(), currentDirectory, program.getCommonSourceDirectory(), getCanonicalFileName);
                if (declarationPath === void 0)
                    return void 0;
                const newLoc = getDocumentPositionMapper2(declarationPath, info.fileName).getGeneratedPosition(info);
                return newLoc === info ? void 0 : newLoc;
            }
            function getSourceFile(fileName) {
                const program = host.getProgram();
                if (!program)
                    return void 0;
                const path = toPath3(fileName);
                const file = program.getSourceFileByPath(path);
                return file && file.resolvedPath === path ? file : void 0;
            }
            function getOrCreateSourceFileLike(fileName) {
                const path = toPath3(fileName);
                const fileFromCache = sourceFileLike.get(path);
                if (fileFromCache !== void 0)
                    return fileFromCache ? fileFromCache : void 0;
                if (!host.readFile || host.fileExists && !host.fileExists(path)) {
                    sourceFileLike.set(path, false);
                    return void 0;
                }
                const text = host.readFile(path);
                const file = text ? createSourceFileLike(text) : false;
                sourceFileLike.set(path, file);
                return file ? file : void 0;
            }
            function getSourceFileLike(fileName) {
                return !host.getSourceFileLike ? getSourceFile(fileName) || getOrCreateSourceFileLike(fileName) : host.getSourceFileLike(fileName);
            }
            function toLineColumnOffset(fileName, position) {
                const file = getSourceFileLike(fileName);
                return file.getLineAndCharacterOfPosition(position);
            }
            function clearCache() {
                sourceFileLike.clear();
                documentPositionMappers.clear();
            }
        }