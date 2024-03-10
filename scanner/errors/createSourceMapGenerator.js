            function addMapping(generatedLine, generatedCharacter, sourceIndex, sourceLine, sourceCharacter, nameIndex) {
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