function convertIterationStatementCore(node, initializerFunction, convertedLoopBody) {
                switch (node.kind) {
                    case 245 /* ForStatement */:
                        return convertForStatement(node, initializerFunction, convertedLoopBody);
                    case 246 /* ForInStatement */:
                        return convertForInStatement(node, convertedLoopBody);
                    case 247 /* ForOfStatement */:
                        return convertForOfStatement(node, convertedLoopBody);
                    case 243 /* DoStatement */:
                        return convertDoStatement(node, convertedLoopBody);
                    case 244 /* WhileStatement */:
                        return convertWhileStatement(node, convertedLoopBody);
                    default:
                        return Debug.failBadSyntaxKind(node, "IterationStatement expected");
                }
            }