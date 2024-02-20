function convertToken(token, ast) {
        const start = token.kind === SyntaxKind.JsxText
            ? token.getFullStart()
            : token.getStart(ast);
        const end = token.getEnd();
        const value = ast.text.slice(start, end);
        const tokenType = getTokenType(token);
        if (tokenType === ts_estree_1.AST_TOKEN_TYPES.RegularExpression) {
            return {
                type: tokenType,
                value,
                range: [start, end],
                loc: getLocFor(start, end, ast),
                regex: {
                    pattern: value.slice(1, value.lastIndexOf('/')),
                    flags: value.slice(value.lastIndexOf('/') + 1),
                },
            };
        }
        else {
            // @ts-expect-error TS is complaining about `value` not being the correct
            // type but it is
            return {
                type: tokenType,
                value,
                range: [start, end],
                loc: getLocFor(start, end, ast),
            };
        }
    }