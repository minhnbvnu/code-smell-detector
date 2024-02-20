function isFunctionReturningThis(originalFunc, originalClass) {
                if (isThisSpecifiedInParameters(originalFunc)) {
                    return false;
                }
                const func = parserServices.esTreeNodeToTSNodeMap.get(originalFunc);
                if (!func.body) {
                    return false;
                }
                const classType = checker.getTypeAtLocation(parserServices.esTreeNodeToTSNodeMap.get(originalClass));
                if (func.body.kind !== ts.SyntaxKind.Block) {
                    const type = checker.getTypeAtLocation(func.body);
                    return classType.thisType === type;
                }
                let hasReturnThis = false;
                let hasReturnClassType = false;
                (0, util_1.forEachReturnStatement)(func.body, stmt => {
                    const expr = stmt.expression;
                    if (!expr) {
                        return;
                    }
                    // fast check
                    if (expr.kind === ts.SyntaxKind.ThisKeyword) {
                        hasReturnThis = true;
                        return;
                    }
                    const type = checker.getTypeAtLocation(expr);
                    if (classType === type) {
                        hasReturnClassType = true;
                        return true;
                    }
                    if (classType.thisType === type) {
                        hasReturnThis = true;
                        return;
                    }
                    return;
                });
                return !hasReturnClassType && hasReturnThis;
            }