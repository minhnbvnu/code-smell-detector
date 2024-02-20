function nextUnsortedSegmentLine(mappings, start) {
            for (let i = start; i < mappings.length; i++) {
                if (!isSorted(mappings[i]))
                    return i;
            }
            return mappings.length;
        }