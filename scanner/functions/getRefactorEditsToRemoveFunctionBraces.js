function getRefactorEditsToRemoveFunctionBraces(context, actionName2) {
            const { file, startPosition } = context;
            const info = getConvertibleArrowFunctionAtPosition(file, startPosition);
            Debug.assert(info && !isRefactorErrorInfo(info), "Expected applicable refactor info");
            const { expression, returnStatement, func } = info;
            let body;
            if (actionName2 === addBracesAction.name) {
                const returnStatement2 = factory.createReturnStatement(expression);
                body = factory.createBlock([returnStatement2], 
                /* multiLine */
                true);
                copyLeadingComments(expression, returnStatement2, file, 3 /* MultiLineCommentTrivia */, 
                /* hasTrailingNewLine */
                true);
            }
            else if (actionName2 === removeBracesAction.name && returnStatement) {
                const actualExpression = expression || factory.createVoidZero();
                body = needsParentheses(actualExpression) ? factory.createParenthesizedExpression(actualExpression) : actualExpression;
                copyTrailingAsLeadingComments(returnStatement, body, file, 3 /* MultiLineCommentTrivia */, 
                /* hasTrailingNewLine */
                false);
                copyLeadingComments(returnStatement, body, file, 3 /* MultiLineCommentTrivia */, 
                /* hasTrailingNewLine */
                false);
                copyTrailingComments(returnStatement, body, file, 3 /* MultiLineCommentTrivia */, 
                /* hasTrailingNewLine */
                false);
            }
            else {
                Debug.fail("invalid action");
            }
            const edits = ts_textChanges_exports.ChangeTracker.with(context, (t) => {
                t.replaceNode(file, func.body, body);
            });
            return { renameFilename: void 0, renameLocation: void 0, edits };
        }