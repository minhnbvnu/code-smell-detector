function makeChange3(changeTracker, errorCode, sourceFile, checker, insertionSite, fixedDeclarations) {
            if (isForOfStatement(insertionSite.parent) && !insertionSite.parent.awaitModifier) {
                const exprType = checker.getTypeAtLocation(insertionSite);
                const asyncIter = checker.getAsyncIterableType();
                if (asyncIter && checker.isTypeAssignableTo(exprType, asyncIter)) {
                    const forOf = insertionSite.parent;
                    changeTracker.replaceNode(sourceFile, forOf, factory.updateForOfStatement(forOf, factory.createToken(133 /* AwaitKeyword */), forOf.initializer, forOf.expression, forOf.statement));
                    return;
                }
            }
            if (isBinaryExpression(insertionSite)) {
                for (const side of [insertionSite.left, insertionSite.right]) {
                    if (fixedDeclarations && isIdentifier(side)) {
                        const symbol = checker.getSymbolAtLocation(side);
                        if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                            continue;
                        }
                    }
                    const type = checker.getTypeAtLocation(side);
                    const newNode = checker.getPromisedTypeOfPromise(type) ? factory.createAwaitExpression(side) : side;
                    changeTracker.replaceNode(sourceFile, side, newNode);
                }
            }
            else if (errorCode === propertyAccessCode && isPropertyAccessExpression(insertionSite.parent)) {
                if (fixedDeclarations && isIdentifier(insertionSite.parent.expression)) {
                    const symbol = checker.getSymbolAtLocation(insertionSite.parent.expression);
                    if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                        return;
                    }
                }
                changeTracker.replaceNode(sourceFile, insertionSite.parent.expression, factory.createParenthesizedExpression(factory.createAwaitExpression(insertionSite.parent.expression)));
                insertLeadingSemicolonIfNeeded(changeTracker, insertionSite.parent.expression, sourceFile);
            }
            else if (contains(callableConstructableErrorCodes, errorCode) && isCallOrNewExpression(insertionSite.parent)) {
                if (fixedDeclarations && isIdentifier(insertionSite)) {
                    const symbol = checker.getSymbolAtLocation(insertionSite);
                    if (symbol && fixedDeclarations.has(getSymbolId(symbol))) {
                        return;
                    }
                }
                changeTracker.replaceNode(sourceFile, insertionSite, factory.createParenthesizedExpression(factory.createAwaitExpression(insertionSite)));
                insertLeadingSemicolonIfNeeded(changeTracker, insertionSite, sourceFile);
            }
            else {
                if (fixedDeclarations && isVariableDeclaration(insertionSite.parent) && isIdentifier(insertionSite.parent.name)) {
                    const symbol = checker.getSymbolAtLocation(insertionSite.parent.name);
                    if (symbol && !tryAddToSet(fixedDeclarations, getSymbolId(symbol))) {
                        return;
                    }
                }
                changeTracker.replaceNode(sourceFile, insertionSite, factory.createAwaitExpression(insertionSite));
            }
        }