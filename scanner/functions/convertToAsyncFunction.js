function convertToAsyncFunction(changes, sourceFile, position, checker) {
            const tokenAtPosition = getTokenAtPosition(sourceFile, position);
            let functionToConvert;
            if (isIdentifier(tokenAtPosition) && isVariableDeclaration(tokenAtPosition.parent) && tokenAtPosition.parent.initializer && isFunctionLikeDeclaration(tokenAtPosition.parent.initializer)) {
                functionToConvert = tokenAtPosition.parent.initializer;
            }
            else {
                functionToConvert = tryCast(getContainingFunction(getTokenAtPosition(sourceFile, position)), canBeConvertedToAsync);
            }
            if (!functionToConvert) {
                return;
            }
            const synthNamesMap = /* @__PURE__ */ new Map();
            const isInJavascript = isInJSFile(functionToConvert);
            const setOfExpressionsToReturn = getAllPromiseExpressionsToReturn(functionToConvert, checker);
            const functionToConvertRenamed = renameCollidingVarNames(functionToConvert, checker, synthNamesMap);
            if (!returnsPromise(functionToConvertRenamed, checker)) {
                return;
            }
            const returnStatements = functionToConvertRenamed.body && isBlock(functionToConvertRenamed.body) ? getReturnStatementsWithPromiseHandlers(functionToConvertRenamed.body, checker) : emptyArray;
            const transformer = { checker, synthNamesMap, setOfExpressionsToReturn, isInJSFile: isInJavascript };
            if (!returnStatements.length) {
                return;
            }
            const pos = skipTrivia(sourceFile.text, moveRangePastModifiers(functionToConvert).pos);
            changes.insertModifierAt(sourceFile, pos, 132 /* AsyncKeyword */, { suffix: " " });
            for (const returnStatement of returnStatements) {
                forEachChild(returnStatement, function visit(node) {
                    if (isCallExpression(node)) {
                        const newNodes = transformExpression(node, node, transformer, 
                        /*hasContinuation*/
                        false);
                        if (hasFailed()) {
                            return true;
                        }
                        changes.replaceNodeWithNodes(sourceFile, returnStatement, newNodes);
                    }
                    else if (!isFunctionLike(node)) {
                        forEachChild(node, visit);
                        if (hasFailed()) {
                            return true;
                        }
                    }
                });
                if (hasFailed()) {
                    return;
                }
            }
        }