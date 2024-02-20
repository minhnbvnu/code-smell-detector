function createSourceMapGenerator(host, file, sourceRoot, sourcesDirectoryPath, generatorOptions) {
            var { enter, exit } = generatorOptions.extendedDiagnostics ? createTimer("Source Map", "beforeSourcemap", "afterSourcemap") : nullTimer;
            var rawSources = [];
            var sources = [];
            var sourceToSourceIndexMap = /* @__PURE__ */ new Map();
            var sourcesContent;
            var names = [];
            var nameToNameIndexMap;
            var mappingCharCodes = [];
            var mappings = "";
            var lastGeneratedLine = 0;
            var lastGeneratedCharacter = 0;
            var lastSourceIndex = 0;
            var lastSourceLine = 0;
            var lastSourceCharacter = 0;
            var lastNameIndex = 0;
            var hasLast = false;
            var pendingGeneratedLine = 0;
            var pendingGeneratedCharacter = 0;
            var pendingSourceIndex = 0;
            var pendingSourceLine = 0;
            var pendingSourceCharacter = 0;
            var pendingNameIndex = 0;
            var hasPending = false;
            var hasPendingSource = false;
            var hasPendingName = false;
            return {
                getSources: () => rawSources,
                addSource,
                setSourceContent,
                addName,
                addMapping,
                appendSourceMap,
                toJSON,
                toString: () => JSON.stringify(toJSON())
            };
            function addSource(fileName) {
                enter();
                const source = getRelativePathToDirectoryOrUrl(sourcesDirectoryPath, fileName, host.getCurrentDirectory(), host.getCanonicalFileName, 
                /*isAbsolutePathAnUrl*/
                true);
                let sourceIndex = sourceToSourceIndexMap.get(source);
                if (sourceIndex === void 0) {
                    sourceIndex = sources.length;
                    sources.push(source);
                    rawSources.push(fileName);
                    sourceToSourceIndexMap.set(source, sourceIndex);
                }
                exit();
                return sourceIndex;
            }
            function setSourceContent(sourceIndex, content) {
                enter();
                if (content !== null) {
                    if (!sourcesContent)
                        sourcesContent = [];
                    while (sourcesContent.length < sourceIndex) {
                        sourcesContent.push(null);
                    }
                    sourcesContent[sourceIndex] = content;
                }
                exit();
            }
            function addName(name) {
                enter();
                if (!nameToNameIndexMap)
                    nameToNameIndexMap = /* @__PURE__ */ new Map();
                let nameIndex = nameToNameIndexMap.get(name);
                if (nameIndex === void 0) {
                    nameIndex = names.length;
                    names.push(name);
                    nameToNameIndexMap.set(name, nameIndex);
                }
                exit();
                return nameIndex;
            }
            function isNewGeneratedPosition(generatedLine, generatedCharacter) {
                return !hasPending || pendingGeneratedLine !== generatedLine || pendingGeneratedCharacter !== generatedCharacter;
            }
            function isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter) {
                return sourceIndex !== void 0 && sourceLine !== void 0 && sourceCharacter !== void 0 && pendingSourceIndex === sourceIndex && (pendingSourceLine > sourceLine || pendingSourceLine === sourceLine && pendingSourceCharacter > sourceCharacter);
            }
            function addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex) {
                Debug.assert(generatedLine >= pendingGeneratedLine, "generatedLine cannot backtrack");
                Debug.assert(generatedCharacter >= 0, "generatedCharacter cannot be negative");
                Debug.assert(sourceIndex === void 0 || sourceIndex >= 0, "sourceIndex cannot be negative");
                Debug.assert(sourceLine === void 0 || sourceLine >= 0, "sourceLine cannot be negative");
                Debug.assert(sourceCharacter === void 0 || sourceCharacter >= 0, "sourceCharacter cannot be negative");
                enter();
                if (isNewGeneratedPosition(generatedLine, generatedCharacter) || isBacktrackingSourcePosition(sourceIndex, sourceLine, sourceCharacter)) {
                    commitPendingMapping();
                    pendingGeneratedLine = generatedLine;
                    pendingGeneratedCharacter = generatedCharacter;
                    hasPendingSource = false;
                    hasPendingName = false;
                    hasPending = true;
                }
                if (sourceIndex !== void 0 && sourceLine !== void 0 && sourceCharacter !== void 0) {
                    pendingSourceIndex = sourceIndex;
                    pendingSourceLine = sourceLine;
                    pendingSourceCharacter = sourceCharacter;
                    hasPendingSource = true;
                    if (nameIndex !== void 0) {
                        pendingNameIndex = nameIndex;
                        hasPendingName = true;
                    }
                }
                exit();
            }
            function appendSourceMap(generatedLine, generatedCharacter, map2, sourceMapPath, start, end) {
                Debug.assert(generatedLine >= pendingGeneratedLine, "generatedLine cannot backtrack");
                Debug.assert(generatedCharacter >= 0, "generatedCharacter cannot be negative");
                enter();
                const sourceIndexToNewSourceIndexMap = [];
                let nameIndexToNewNameIndexMap;
                const mappingIterator = decodeMappings(map2.mappings);
                for (const raw of mappingIterator) {
                    if (end && (raw.generatedLine > end.line || raw.generatedLine === end.line && raw.generatedCharacter > end.character)) {
                        break;
                    }
                    if (start && (raw.generatedLine < start.line || start.line === raw.generatedLine && raw.generatedCharacter < start.character)) {
                        continue;
                    }
                    let newSourceIndex;
                    let newSourceLine;
                    let newSourceCharacter;
                    let newNameIndex;
                    if (raw.sourceIndex !== void 0) {
                        newSourceIndex = sourceIndexToNewSourceIndexMap[raw.sourceIndex];
                        if (newSourceIndex === void 0) {
                            const rawPath = map2.sources[raw.sourceIndex];
                            const relativePath = map2.sourceRoot ? combinePaths(map2.sourceRoot, rawPath) : rawPath;
                            const combinedPath = combinePaths(getDirectoryPath(sourceMapPath), relativePath);
                            sourceIndexToNewSourceIndexMap[raw.sourceIndex] = newSourceIndex = addSource(combinedPath);
                            if (map2.sourcesContent && typeof map2.sourcesContent[raw.sourceIndex] === "string") {
                                setSourceContent(newSourceIndex, map2.sourcesContent[raw.sourceIndex]);
                            }
                        }
                        newSourceLine = raw.sourceLine;
                        newSourceCharacter = raw.sourceCharacter;
                        if (map2.names && raw.nameIndex !== void 0) {
                            if (!nameIndexToNewNameIndexMap)
                                nameIndexToNewNameIndexMap = [];
                            newNameIndex = nameIndexToNewNameIndexMap[raw.nameIndex];
                            if (newNameIndex === void 0) {
                                nameIndexToNewNameIndexMap[raw.nameIndex] = newNameIndex = addName(map2.names[raw.nameIndex]);
                            }
                        }
                    }
                    const rawGeneratedLine = raw.generatedLine - (start ? start.line : 0);
                    const newGeneratedLine = rawGeneratedLine + generatedLine;
                    const rawGeneratedCharacter = start && start.line === raw.generatedLine ? raw.generatedCharacter - start.character : raw.generatedCharacter;
                    const newGeneratedCharacter = rawGeneratedLine === 0 ? rawGeneratedCharacter + generatedCharacter : rawGeneratedCharacter;
                    addMapping(newGeneratedLine, newGeneratedCharacter, newSourceIndex, newSourceLine, newSourceCharacter, newNameIndex);
                }
                exit();
            }
            function shouldCommitMapping() {
                return !hasLast || lastGeneratedLine !== pendingGeneratedLine || lastGeneratedCharacter !== pendingGeneratedCharacter || lastSourceIndex !== pendingSourceIndex || lastSourceLine !== pendingSourceLine || lastSourceCharacter !== pendingSourceCharacter || lastNameIndex !== pendingNameIndex;
            }
            function appendMappingCharCode(charCode) {
                mappingCharCodes.push(charCode);
                if (mappingCharCodes.length >= 1024) {
                    flushMappingBuffer();
                }
            }
            function commitPendingMapping() {
                if (!hasPending || !shouldCommitMapping()) {
                    return;
                }
                enter();
                if (lastGeneratedLine < pendingGeneratedLine) {
                    do {
                        appendMappingCharCode(59 /* semicolon */);
                        lastGeneratedLine++;
                    } while (lastGeneratedLine < pendingGeneratedLine);
                    lastGeneratedCharacter = 0;
                }
                else {
                    Debug.assertEqual(lastGeneratedLine, pendingGeneratedLine, "generatedLine cannot backtrack");
                    if (hasLast) {
                        appendMappingCharCode(44 /* comma */);
                    }
                }
                appendBase64VLQ(pendingGeneratedCharacter - lastGeneratedCharacter);
                lastGeneratedCharacter = pendingGeneratedCharacter;
                if (hasPendingSource) {
                    appendBase64VLQ(pendingSourceIndex - lastSourceIndex);
                    lastSourceIndex = pendingSourceIndex;
                    appendBase64VLQ(pendingSourceLine - lastSourceLine);
                    lastSourceLine = pendingSourceLine;
                    appendBase64VLQ(pendingSourceCharacter - lastSourceCharacter);
                    lastSourceCharacter = pendingSourceCharacter;
                    if (hasPendingName) {
                        appendBase64VLQ(pendingNameIndex - lastNameIndex);
                        lastNameIndex = pendingNameIndex;
                    }
                }
                hasLast = true;
                exit();
            }
            function flushMappingBuffer() {
                if (mappingCharCodes.length > 0) {
                    mappings += String.fromCharCode.apply(void 0, mappingCharCodes);
                    mappingCharCodes.length = 0;
                }
            }
            function toJSON() {
                commitPendingMapping();
                flushMappingBuffer();
                return {
                    version: 3,
                    file,
                    sourceRoot,
                    sources,
                    names,
                    mappings,
                    sourcesContent
                };
            }
            function appendBase64VLQ(inValue) {
                if (inValue < 0) {
                    inValue = (-inValue << 1) + 1;
                }
                else {
                    inValue = inValue << 1;
                }
                do {
                    let currentDigit = inValue & 31;
                    inValue = inValue >> 5;
                    if (inValue > 0) {
                        currentDigit = currentDigit | 32;
                    }
                    appendMappingCharCode(base64FormatEncode(currentDigit));
                } while (inValue > 0);
            }
        }