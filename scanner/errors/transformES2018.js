            function visitorWorker(node, expressionResultIsUnused2) {
                if ((node.transformFlags & 128 /* ContainsES2018 */) === 0) {
                    return node;
                }
                switch (node.kind) {
                    case 220 /* AwaitExpression */:
                        return visitAwaitExpression(node);
                    case 226 /* YieldExpression */:
                        return visitYieldExpression(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    case 253 /* LabeledStatement */:
                        return visitLabeledStatement(node);
                    case 207 /* ObjectLiteralExpression */:
                        return visitObjectLiteralExpression(node);
                    case 223 /* BinaryExpression */:
                        return visitBinaryExpression(node, expressionResultIsUnused2);
                    case 357 /* CommaListExpression */:
                        return visitCommaListExpression(node, expressionResultIsUnused2);
                    case 295 /* CatchClause */:
                        return visitCatchClause(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 257 /* VariableDeclaration */:
                        return visitVariableDeclaration(node);
                    case 243 /* DoStatement */:
                    case 244 /* WhileStatement */:
                    case 246 /* ForInStatement */:
                        return doWithHierarchyFacts(visitDefault, node, 0 /* IterationStatementExcludes */, 2 /* IterationStatementIncludes */);
                    case 247 /* ForOfStatement */:
                        return visitForOfStatement(node, 
                        /*outermostLabeledStatement*/
                        void 0);
                    case 245 /* ForStatement */:
                        return doWithHierarchyFacts(visitForStatement, node, 0 /* IterationStatementExcludes */, 2 /* IterationStatementIncludes */);
                    case 219 /* VoidExpression */:
                        return visitVoidExpression(node);
                    case 173 /* Constructor */:
                        return doWithHierarchyFacts(visitConstructorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 171 /* MethodDeclaration */:
                        return doWithHierarchyFacts(visitMethodDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 174 /* GetAccessor */:
                        return doWithHierarchyFacts(visitGetAccessorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 175 /* SetAccessor */:
                        return doWithHierarchyFacts(visitSetAccessorDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 259 /* FunctionDeclaration */:
                        return doWithHierarchyFacts(visitFunctionDeclaration, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 215 /* FunctionExpression */:
                        return doWithHierarchyFacts(visitFunctionExpression, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    case 216 /* ArrowFunction */:
                        return doWithHierarchyFacts(visitArrowFunction, node, 2 /* ArrowFunctionExcludes */, 0 /* ArrowFunctionIncludes */);
                    case 166 /* Parameter */:
                        return visitParameter(node);
                    case 241 /* ExpressionStatement */:
                        return visitExpressionStatement(node);
                    case 214 /* ParenthesizedExpression */:
                        return visitParenthesizedExpression(node, expressionResultIsUnused2);
                    case 212 /* TaggedTemplateExpression */:
                        return visitTaggedTemplateExpression(node);
                    case 208 /* PropertyAccessExpression */:
                        if (capturedSuperProperties && isPropertyAccessExpression(node) && node.expression.kind === 106 /* SuperKeyword */) {
                            capturedSuperProperties.add(node.name.escapedText);
                        }
                        return visitEachChild(node, visitor, context);
                    case 209 /* ElementAccessExpression */:
                        if (capturedSuperProperties && node.expression.kind === 106 /* SuperKeyword */) {
                            hasSuperElementAccess = true;
                        }
                        return visitEachChild(node, visitor, context);
                    case 260 /* ClassDeclaration */:
                    case 228 /* ClassExpression */:
                        return doWithHierarchyFacts(visitDefault, node, 2 /* ClassOrFunctionExcludes */, 1 /* ClassOrFunctionIncludes */);
                    default:
                        return visitEachChild(node, visitor, context);
                }
            }