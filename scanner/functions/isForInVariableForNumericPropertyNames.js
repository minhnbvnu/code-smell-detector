function isForInVariableForNumericPropertyNames(expr) {
                const e = skipParentheses(expr);
                if (e.kind === 79 /* Identifier */) {
                    const symbol = getResolvedSymbol(e);
                    if (symbol.flags & 3 /* Variable */) {
                        let child = expr;
                        let node = expr.parent;
                        while (node) {
                            if (node.kind === 246 /* ForInStatement */ && child === node.statement && getForInVariableSymbol(node) === symbol && hasNumericPropertyNames(getTypeOfExpression(node.expression))) {
                                return true;
                            }
                            child = node;
                            node = node.parent;
                        }
                    }
                }
                return false;
            }