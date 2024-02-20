function getConvertibleArrowFunctionAtPosition(file, startPosition, considerFunctionBodies = true, kind) {
            const node = getTokenAtPosition(file, startPosition);
            const func = getContainingFunction(node);
            if (!func) {
                return {
                    error: getLocaleSpecificMessage(Diagnostics.Could_not_find_a_containing_arrow_function)
                };
            }
            if (!isArrowFunction(func)) {
                return {
                    error: getLocaleSpecificMessage(Diagnostics.Containing_function_is_not_an_arrow_function)
                };
            }
            if (!rangeContainsRange(func, node) || rangeContainsRange(func.body, node) && !considerFunctionBodies) {
                return void 0;
            }
            if (refactorKindBeginsWith(addBracesAction.kind, kind) && isExpression(func.body)) {
                return { func, addBraces: true, expression: func.body };
            }
            else if (refactorKindBeginsWith(removeBracesAction.kind, kind) && isBlock(func.body) && func.body.statements.length === 1) {
                const firstStatement = first(func.body.statements);
                if (isReturnStatement(firstStatement)) {
                    return { func, addBraces: false, expression: firstStatement.expression, returnStatement: firstStatement };
                }
            }
            return void 0;
        }