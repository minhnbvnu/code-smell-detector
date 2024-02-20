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