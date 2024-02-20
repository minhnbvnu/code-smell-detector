function getStartPositionOfLine(line, sourceFile) {
            Debug.assert(line >= 0);
            return getLineStarts(sourceFile)[line];
        }