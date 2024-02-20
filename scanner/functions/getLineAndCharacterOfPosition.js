function getLineAndCharacterOfPosition(sourceFile, position) {
            return computeLineAndCharacterOfPosition(getLineStarts(sourceFile), position);
        }