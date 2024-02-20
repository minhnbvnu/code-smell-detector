function isNodeArrayMultiLine(list, sourceFile) {
            return !positionsAreOnSameLine(list.pos, list.end, sourceFile);
        }