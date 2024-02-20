function nameForNamelessJSDocTypedef(declaration) {
            const hostNode = declaration.parent.parent;
            if (!hostNode) {
                return void 0;
            }
            if (isDeclaration(hostNode)) {
                return getDeclarationIdentifier(hostNode);
            }
            switch (hostNode.kind) {
                case 240 /* VariableStatement */:
                    if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                        return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
                    }
                    break;
                case 241 /* ExpressionStatement */:
                    let expr = hostNode.expression;
                    if (expr.kind === 223 /* BinaryExpression */ && expr.operatorToken.kind === 63 /* EqualsToken */) {
                        expr = expr.left;
                    }
                    switch (expr.kind) {
                        case 208 /* PropertyAccessExpression */:
                            return expr.name;
                        case 209 /* ElementAccessExpression */:
                            const arg = expr.argumentExpression;
                            if (isIdentifier(arg)) {
                                return arg;
                            }
                    }
                    break;
                case 214 /* ParenthesizedExpression */: {
                    return getDeclarationIdentifier(hostNode.expression);
                }
                case 253 /* LabeledStatement */: {
                    if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                        return getDeclarationIdentifier(hostNode.statement);
                    }
                    break;
                }
            }
        }