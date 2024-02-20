function getPositionOfLineAndCharacter(sourceFile, line, character, allowEdits) {
            return sourceFile.getPositionOfLineAndCharacter ? sourceFile.getPositionOfLineAndCharacter(line, character, allowEdits) : computePositionOfLineAndCharacter(getLineStarts(sourceFile), line, character, sourceFile.text, allowEdits);
        }