function createDocumentPositionMapper(host, map2, mapPath) {
            const mapDirectory = getDirectoryPath(mapPath);
            const sourceRoot = map2.sourceRoot ? getNormalizedAbsolutePath(map2.sourceRoot, mapDirectory) : mapDirectory;
            const generatedAbsoluteFilePath = getNormalizedAbsolutePath(map2.file, mapDirectory);
            const generatedFile = host.getSourceFileLike(generatedAbsoluteFilePath);
            const sourceFileAbsolutePaths = map2.sources.map((source) => getNormalizedAbsolutePath(source, sourceRoot));
            const sourceToSourceIndexMap = new Map(sourceFileAbsolutePaths.map((source, i) => [host.getCanonicalFileName(source), i]));
            let decodedMappings;
            let generatedMappings;
            let sourceMappings;
            return {
                getSourcePosition,
                getGeneratedPosition
            };
            function processMapping(mapping) {
                const generatedPosition = generatedFile !== void 0 ? getPositionOfLineAndCharacter(generatedFile, mapping.generatedLine, mapping.generatedCharacter, 
                /*allowEdits*/
                true) : -1;
                let source;
                let sourcePosition;
                if (isSourceMapping(mapping)) {
                    const sourceFile = host.getSourceFileLike(sourceFileAbsolutePaths[mapping.sourceIndex]);
                    source = map2.sources[mapping.sourceIndex];
                    sourcePosition = sourceFile !== void 0 ? getPositionOfLineAndCharacter(sourceFile, mapping.sourceLine, mapping.sourceCharacter, 
                    /*allowEdits*/
                    true) : -1;
                }
                return {
                    generatedPosition,
                    source,
                    sourceIndex: mapping.sourceIndex,
                    sourcePosition,
                    nameIndex: mapping.nameIndex
                };
            }
            function getDecodedMappings() {
                if (decodedMappings === void 0) {
                    const decoder = decodeMappings(map2.mappings);
                    const mappings = arrayFrom(decoder, processMapping);
                    if (decoder.error !== void 0) {
                        if (host.log) {
                            host.log(`Encountered error while decoding sourcemap: ${decoder.error}`);
                        }
                        decodedMappings = emptyArray;
                    }
                    else {
                        decodedMappings = mappings;
                    }
                }
                return decodedMappings;
            }
            function getSourceMappings(sourceIndex) {
                if (sourceMappings === void 0) {
                    const lists = [];
                    for (const mapping of getDecodedMappings()) {
                        if (!isSourceMappedPosition(mapping))
                            continue;
                        let list = lists[mapping.sourceIndex];
                        if (!list)
                            lists[mapping.sourceIndex] = list = [];
                        list.push(mapping);
                    }
                    sourceMappings = lists.map((list) => sortAndDeduplicate(list, compareSourcePositions, sameMappedPosition));
                }
                return sourceMappings[sourceIndex];
            }
            function getGeneratedMappings() {
                if (generatedMappings === void 0) {
                    const list = [];
                    for (const mapping of getDecodedMappings()) {
                        list.push(mapping);
                    }
                    generatedMappings = sortAndDeduplicate(list, compareGeneratedPositions, sameMappedPosition);
                }
                return generatedMappings;
            }
            function getGeneratedPosition(loc) {
                const sourceIndex = sourceToSourceIndexMap.get(host.getCanonicalFileName(loc.fileName));
                if (sourceIndex === void 0)
                    return loc;
                const sourceMappings2 = getSourceMappings(sourceIndex);
                if (!some(sourceMappings2))
                    return loc;
                let targetIndex = binarySearchKey(sourceMappings2, loc.pos, getSourcePositionOfMapping, compareValues);
                if (targetIndex < 0) {
                    targetIndex = ~targetIndex;
                }
                const mapping = sourceMappings2[targetIndex];
                if (mapping === void 0 || mapping.sourceIndex !== sourceIndex) {
                    return loc;
                }
                return { fileName: generatedAbsoluteFilePath, pos: mapping.generatedPosition };
            }
            function getSourcePosition(loc) {
                const generatedMappings2 = getGeneratedMappings();
                if (!some(generatedMappings2))
                    return loc;
                let targetIndex = binarySearchKey(generatedMappings2, loc.pos, getGeneratedPositionOfMapping, compareValues);
                if (targetIndex < 0) {
                    targetIndex = ~targetIndex;
                }
                const mapping = generatedMappings2[targetIndex];
                if (mapping === void 0 || !isSourceMappedPosition(mapping)) {
                    return loc;
                }
                return { fileName: sourceFileAbsolutePaths[mapping.sourceIndex], pos: mapping.sourcePosition };
            }
        }