function formatCodeSpan(file, start, length2, indent2, squiggleColor, host) {
            const { line: firstLine, character: firstLineChar } = getLineAndCharacterOfPosition(file, start);
            const { line: lastLine, character: lastLineChar } = getLineAndCharacterOfPosition(file, start + length2);
            const lastLineInFile = getLineAndCharacterOfPosition(file, file.text.length).line;
            const hasMoreThanFiveLines = lastLine - firstLine >= 4;
            let gutterWidth = (lastLine + 1 + "").length;
            if (hasMoreThanFiveLines) {
                gutterWidth = Math.max(ellipsis.length, gutterWidth);
            }
            let context = "";
            for (let i = firstLine; i <= lastLine; i++) {
                context += host.getNewLine();
                if (hasMoreThanFiveLines && firstLine + 1 < i && i < lastLine - 1) {
                    context += indent2 + formatColorAndReset(padLeft(ellipsis, gutterWidth), gutterStyleSequence) + gutterSeparator + host.getNewLine();
                    i = lastLine - 1;
                }
                const lineStart = getPositionOfLineAndCharacter(file, i, 0);
                const lineEnd = i < lastLineInFile ? getPositionOfLineAndCharacter(file, i + 1, 0) : file.text.length;
                let lineContent = file.text.slice(lineStart, lineEnd);
                lineContent = trimStringEnd(lineContent);
                lineContent = lineContent.replace(/\t/g, " ");
                context += indent2 + formatColorAndReset(padLeft(i + 1 + "", gutterWidth), gutterStyleSequence) + gutterSeparator;
                context += lineContent + host.getNewLine();
                context += indent2 + formatColorAndReset(padLeft("", gutterWidth), gutterStyleSequence) + gutterSeparator;
                context += squiggleColor;
                if (i === firstLine) {
                    const lastCharForLine = i === lastLine ? lastLineChar : void 0;
                    context += lineContent.slice(0, firstLineChar).replace(/\S/g, " ");
                    context += lineContent.slice(firstLineChar, lastCharForLine).replace(/./g, "~");
                }
                else if (i === lastLine) {
                    context += lineContent.slice(0, lastLineChar).replace(/./g, "~");
                }
                else {
                    context += lineContent.replace(/./g, "~");
                }
                context += resetEscapeSequence;
            }
            return context;
        }