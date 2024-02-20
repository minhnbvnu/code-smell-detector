function getLineRanges(sourceFile) {
        const lineStarts = sourceFile.getLineStarts();
        const result = [];
        const length = lineStarts.length;
        const sourceText = sourceFile.text;
        let pos = 0;
        for (let i = 1; i < length; ++i) {
            const end = lineStarts[i];
            let lineEnd = end;
            for (; lineEnd > pos; --lineEnd)
                if (!ts.isLineBreak(sourceText.charCodeAt(lineEnd - 1)))
                    break;
            result.push({
                pos,
                end,
                contentLength: lineEnd - pos,
            });
            pos = end;
        }
        result.push({
            pos,
            end: sourceFile.end,
            contentLength: sourceFile.end - pos,
        });
        return result;
    }