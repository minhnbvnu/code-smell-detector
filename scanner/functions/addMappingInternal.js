function addMappingInternal(skipable, map, mapping) {
            const { generated, source, original, name } = mapping;
            if (!source) {
                return addSegmentInternal(skipable, map, generated.line - 1, generated.column, null, null, null, null);
            }
            const s = source;
            return addSegmentInternal(skipable, map, generated.line - 1, generated.column, s, original.line - 1, original.column, name);
        }