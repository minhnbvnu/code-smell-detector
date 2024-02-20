function isNullOrUndefined3(node) {
                const expr = skipParentheses(node, 
                /*excludeJSDocTypeAssertions*/
                true);
                return expr.kind === 104 /* NullKeyword */ || expr.kind === 79 /* Identifier */ && getResolvedSymbol(expr) === undefinedSymbol;
            }