function recordMergedSymbol(target, source) {
                if (!source.mergeId) {
                    source.mergeId = nextMergeId;
                    nextMergeId++;
                }
                mergedSymbols[source.mergeId] = target;
            }