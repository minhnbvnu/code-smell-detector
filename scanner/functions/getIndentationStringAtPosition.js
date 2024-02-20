function getIndentationStringAtPosition(sourceFile, position) {
            const { text } = sourceFile;
            const lineStart = getLineStartPositionForPosition(position, sourceFile);
            let pos = lineStart;
            for (; pos <= position && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++)
                ;
            return text.slice(lineStart, pos);
        }