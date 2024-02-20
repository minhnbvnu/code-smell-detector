function getLineStartPositionForPosition(position, sourceFile) {
            const lineStarts = getLineStarts(sourceFile);
            const line = sourceFile.getLineAndCharacterOfPosition(position).line;
            return lineStarts[line];
        }