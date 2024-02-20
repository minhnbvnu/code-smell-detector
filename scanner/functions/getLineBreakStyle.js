function getLineBreakStyle(sourceFile) {
        const lineStarts = sourceFile.getLineStarts();
        return lineStarts.length === 1 || lineStarts[1] < 2 || sourceFile.text[lineStarts[1] - 2] !== '\r'
            ? '\n'
            : '\r\n';
    }