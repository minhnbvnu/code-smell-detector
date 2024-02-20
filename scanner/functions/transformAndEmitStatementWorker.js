function transformAndEmitStatementWorker(node) {
                switch (node.kind) {
                    case 238 /* Block */:
                        return transformAndEmitBlock(node);
                    case 241 /* ExpressionStatement */:
                        return transformAndEmitExpressionStatement(node);
                    case 242 /* IfStatement */:
                        return transformAndEmitIfStatement(node);
                    case 243 /* DoStatement */:
                        return transformAndEmitDoStatement(node);
                    case 244 /* WhileStatement */:
                        return transformAndEmitWhileStatement(node);
                    case 245 /* ForStatement */:
                        return transformAndEmitForStatement(node);
                    case 246 /* ForInStatement */:
                        return transformAndEmitForInStatement(node);
                    case 248 /* ContinueStatement */:
                        return transformAndEmitContinueStatement(node);
                    case 249 /* BreakStatement */:
                        return transformAndEmitBreakStatement(node);
                    case 250 /* ReturnStatement */:
                        return transformAndEmitReturnStatement(node);
                    case 251 /* WithStatement */:
                        return transformAndEmitWithStatement(node);
                    case 252 /* SwitchStatement */:
                        return transformAndEmitSwitchStatement(node);
                    case 253 /* LabeledStatement */:
                        return transformAndEmitLabeledStatement(node);
                    case 254 /* ThrowStatement */:
                        return transformAndEmitThrowStatement(node);
                    case 255 /* TryStatement */:
                        return transformAndEmitTryStatement(node);
                    default:
                        return emitStatement(visitNode(node, visitor, isStatement));
                }
            }