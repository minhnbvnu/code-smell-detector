function skipSourceless(line, index) {
            // The start of a line is already sourceless, so adding a sourceless segment to the beginning
            // doesn't generate any useful information.
            if (index === 0)
                return true;
            const prev = line[index - 1];
            // If the previous segment is also sourceless, then adding another sourceless segment doesn't
            // genrate any new information. Else, this segment will end the source/named segment and point to
            // a sourceless position, which is useful.
            return prev.length === 1;
        }