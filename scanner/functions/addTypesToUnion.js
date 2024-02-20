function addTypesToUnion(typeSet, includes, types) {
                for (const type of types) {
                    includes = addTypeToUnion(typeSet, includes, type);
                }
                return includes;
            }