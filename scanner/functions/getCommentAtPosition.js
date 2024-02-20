function getCommentAtPosition(sourceFile, pos, parent = sourceFile) {
        const token = getTokenAtPosition(parent, pos, sourceFile);
        if (token === undefined || token.kind === ts.SyntaxKind.JsxText || pos >= token.end - (ts.tokenToString(token.kind) || '').length)
            return;
        const startPos = token.pos === 0
            ? (ts.getShebang(sourceFile.text) || '').length
            : token.pos;
        return startPos !== 0 && ts.forEachTrailingCommentRange(sourceFile.text, startPos, commentAtPositionCallback, pos) ||
            ts.forEachLeadingCommentRange(sourceFile.text, startPos, commentAtPositionCallback, pos);
    }