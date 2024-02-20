function isSameLine(sourceFile, pos1, pos2) {
        return ts.getLineAndCharacterOfPosition(sourceFile, pos1).line === ts.getLineAndCharacterOfPosition(sourceFile, pos2).line;
    }