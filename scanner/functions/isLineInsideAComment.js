function isLineInsideAComment(line, lineNumber, commentNodes, sourceCode) {
    for (let i = 0; i < commentNodes.length; i++) {
        const c = commentNodes[i];

        switch (c.type) {
        case "Line":
            if (lineNumber === sourceCode.getLine(c)) {
                return true;
            }
            break;

        case "Block":
            if (lineNumber >= sourceCode.getLine(c) && lineNumber < sourceCode.getEndingLine(c)) {
                return true;
            }
            break;
        }
    }

    return false;
}