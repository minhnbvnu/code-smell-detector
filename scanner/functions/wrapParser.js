function wrapParser(parser) {
        if (typeof parser.parseForESLint === "function") {
            return {
                [parserSymbol]: parser,
                parseForESLint(...args) {
                    const ret = parser.parseForESLint(...args);
                    defineStartEndAsErrorInTree(ret.ast, ret.visitorKeys);
                    return ret;
                }
            };
        }
        return {
            [parserSymbol]: parser,
            parse(...args) {
                const ast = parser.parse(...args);
                defineStartEndAsErrorInTree(ast);
                return ast;
            }
        };
    }