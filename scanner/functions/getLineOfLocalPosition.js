function getLineOfLocalPosition(sourceFile, pos) {
            const lineStarts = getLineStarts(sourceFile);
            return computeLineOfPosition(lineStarts, pos);
        }