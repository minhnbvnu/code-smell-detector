function formatOnEnter(position, sourceFile, formatContext) {
            const line = sourceFile.getLineAndCharacterOfPosition(position).line;
            if (line === 0) {
                return [];
            }
            let endOfFormatSpan = getEndLinePosition(line, sourceFile);
            while (isWhiteSpaceSingleLine(sourceFile.text.charCodeAt(endOfFormatSpan))) {
                endOfFormatSpan--;
            }
            if (isLineBreak(sourceFile.text.charCodeAt(endOfFormatSpan))) {
                endOfFormatSpan--;
            }
            const span = {
                // get start position for the previous line
                pos: getStartPositionOfLine(line - 1, sourceFile),
                // end value is exclusive so add 1 to the result
                end: endOfFormatSpan + 1
            };
            return formatSpan(span, sourceFile, formatContext, 2 /* FormatOnEnter */);
        }