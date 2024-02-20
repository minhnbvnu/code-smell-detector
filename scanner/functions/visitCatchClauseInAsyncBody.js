function visitCatchClauseInAsyncBody(node) {
                const catchClauseNames = /* @__PURE__ */ new Set();
                recordDeclarationName(node.variableDeclaration, catchClauseNames);
                let catchClauseUnshadowedNames;
                catchClauseNames.forEach((_, escapedName) => {
                    if (enclosingFunctionParameterNames.has(escapedName)) {
                        if (!catchClauseUnshadowedNames) {
                            catchClauseUnshadowedNames = new Set(enclosingFunctionParameterNames);
                        }
                        catchClauseUnshadowedNames.delete(escapedName);
                    }
                });
                if (catchClauseUnshadowedNames) {
                    const savedEnclosingFunctionParameterNames = enclosingFunctionParameterNames;
                    enclosingFunctionParameterNames = catchClauseUnshadowedNames;
                    const result = visitEachChild(node, asyncBodyVisitor, context);
                    enclosingFunctionParameterNames = savedEnclosingFunctionParameterNames;
                    return result;
                }
                else {
                    return visitEachChild(node, asyncBodyVisitor, context);
                }
            }