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