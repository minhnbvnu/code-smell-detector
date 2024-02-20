function skipSource(line, index, sourcesIndex, sourceLine, sourceColumn, namesIndex) {
            // A source/named segment at the start of a line gives position at that genColumn
            if (index === 0)
                return false;
            const prev = line[index - 1];
            // If the previous segment is sourceless, then we're transitioning to a source.
            if (prev.length === 1)
                return false;
            // If the previous segment maps to the exact same source position, then this segment doesn't
            // provide any new position information.
            return (sourcesIndex === prev[SOURCES_INDEX] &&
                sourceLine === prev[SOURCE_LINE] &&
                sourceColumn === prev[SOURCE_COLUMN] &&
                namesIndex === (prev.length === 5 ? prev[NAMES_INDEX] : NO_NAME));
        }