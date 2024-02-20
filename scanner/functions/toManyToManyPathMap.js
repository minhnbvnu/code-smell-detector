function toManyToManyPathMap(referenceMap) {
                if (!referenceMap) {
                    return void 0;
                }
                const map2 = BuilderState.createManyToManyPathMap();
                referenceMap.forEach(([fileId, fileIdListId]) => map2.set(toFilePath(fileId), toFilePathsSet(fileIdListId)));
                return map2;
            }