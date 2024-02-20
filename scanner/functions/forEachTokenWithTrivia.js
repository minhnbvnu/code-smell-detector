function forEachTokenWithTrivia(node, cb, sourceFile = node.getSourceFile()) {
        const fullText = sourceFile.text;
        const scanner = ts.createScanner(sourceFile.languageVersion, false, sourceFile.languageVariant, fullText);
        return forEachToken(node, (token) => {
            const tokenStart = token.kind === ts.SyntaxKind.JsxText || token.pos === token.end ? token.pos : token.getStart(sourceFile);
            if (tokenStart !== token.pos) {
                // we only have to handle trivia before each token. whitespace at the end of the file is followed by EndOfFileToken
                scanner.setTextPos(token.pos);
                let kind = scanner.scan();
                let pos = scanner.getTokenPos();
                while (pos < tokenStart) {
                    const textPos = scanner.getTextPos();
                    cb(fullText, kind, { pos, end: textPos }, token.parent);
                    if (textPos === tokenStart)
                        break;
                    kind = scanner.scan();
                    pos = scanner.getTokenPos();
                }
            }
            return cb(fullText, token.kind, { end: token.end, pos: tokenStart }, token.parent);
        }, sourceFile);
    }