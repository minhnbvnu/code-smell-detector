function makeChange8(changes, sourceFile, position, seenLines) {
            const { line: lineNumber } = getLineAndCharacterOfPosition(sourceFile, position);
            if (!seenLines || tryAddToSet(seenLines, lineNumber)) {
                changes.insertCommentBeforeLine(sourceFile, lineNumber, position, " @ts-ignore");
            }
        }