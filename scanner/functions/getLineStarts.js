function getLineStarts(sourceFile) {
            return sourceFile.lineMap || (sourceFile.lineMap = computeLineStarts(sourceFile.text));
        }