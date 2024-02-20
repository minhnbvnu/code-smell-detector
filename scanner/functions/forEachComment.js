function forEachComment(node, cb, sourceFile = node.getSourceFile()) {
        /* Visit all tokens and skip trivia.
           Comment ranges between tokens are parsed without the need of a scanner.
           forEachTokenWithWhitespace does intentionally not pay attention to the correct comment ownership of nodes as it always
           scans all trivia before each token, which could include trailing comments of the previous token.
           Comment onwership is done right in this function*/
        const fullText = sourceFile.text;
        const notJsx = sourceFile.languageVariant !== ts.LanguageVariant.JSX;
        return forEachToken(node, (token) => {
            if (token.pos === token.end)
                return;
            if (token.kind !== ts.SyntaxKind.JsxText)
                ts.forEachLeadingCommentRange(fullText, 
                // skip shebang at position 0
                token.pos === 0 ? (ts.getShebang(fullText) || '').length : token.pos, commentCallback);
            if (notJsx || canHaveTrailingTrivia(token))
                return ts.forEachTrailingCommentRange(fullText, token.end, commentCallback);
        }, sourceFile);
        function commentCallback(pos, end, kind) {
            cb(fullText, { pos, end, kind });
        }
    }