function maybeSort(mappings, owned) {
            const unsortedIndex = nextUnsortedSegmentLine(mappings, 0);
            if (unsortedIndex === mappings.length)
                return mappings;
            // If we own the array (meaning we parsed it from JSON), then we're free to directly mutate it. If
            // not, we do not want to modify the consumer's input array.
            if (!owned)
                mappings = mappings.slice();
            for (let i = unsortedIndex; i < mappings.length; i = nextUnsortedSegmentLine(mappings, i + 1)) {
                mappings[i] = sortSegments(mappings[i], owned);
            }
            return mappings;
        }