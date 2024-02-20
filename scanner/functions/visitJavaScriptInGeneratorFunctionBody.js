function visitJavaScriptInGeneratorFunctionBody(node) {
                switch (node.kind) {
                    case 259 /* FunctionDeclaration */:
                        return visitFunctionDeclaration(node);
                    case 215 /* FunctionExpression */:
                        return visitFunctionExpression(node);
                    case 174 /* GetAccessor */:
                    case 175 /* SetAccessor */:
                        return visitAccessorDeclaration(node);
                    case 240 /* VariableStatement */:
                        return visitVariableStatement(node);
                    case 245 /* ForStatement */:
                        return visitForStatement(node);
                    case 246 /* ForInStatement */:
                        return visitForInStatement(node);
                    case 249 /* BreakStatement */:
                        return visitBreakStatement(node);
                    case 248 /* ContinueStatement */:
                        return visitContinueStatement(node);
                    case 250 /* ReturnStatement */:
                        return visitReturnStatement(node);
                    default:
                        if (node.transformFlags & 1048576 /* ContainsYield */) {
                            return visitJavaScriptContainingYield(node);
                        }
                        else if (node.transformFlags & (2048 /* ContainsGenerator */ | 4194304 /* ContainsHoistedDeclarationOrCompletion */)) {
                            return visitEachChild(node, visitor, context);
                        }
                        else {
                            return node;
                        }
                }
            }