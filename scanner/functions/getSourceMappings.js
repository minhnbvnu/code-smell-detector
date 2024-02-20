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