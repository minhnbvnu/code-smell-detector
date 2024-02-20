function convertTokens(ast) {
        const result = [];
        /**
         * @param node the ts.Node
         */
        function walk(node) {
            // TypeScript generates tokens for types in JSDoc blocks. Comment tokens
            // and their children should not be walked or added to the resulting tokens list.
            if (isComment(node) || isJSDocComment(node)) {
                return;
            }
            if (isToken(node) && node.kind !== SyntaxKind.EndOfFileToken) {
                const converted = convertToken(node, ast);
                if (converted) {
                    result.push(converted);
                }
            }
            else {
                node.getChildren(ast).forEach(walk);
            }
        }
        walk(ast);
        return result;
    }