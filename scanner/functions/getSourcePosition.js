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