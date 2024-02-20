function spanInCloseParenToken(node2) {
                    switch (node2.parent.kind) {
                        case 215 /* FunctionExpression */:
                        case 259 /* FunctionDeclaration */:
                        case 216 /* ArrowFunction */:
                        case 171 /* MethodDeclaration */:
                        case 170 /* MethodSignature */:
                        case 174 /* GetAccessor */:
                        case 175 /* SetAccessor */:
                        case 173 /* Constructor */:
                        case 244 /* WhileStatement */:
                        case 243 /* DoStatement */:
                        case 245 /* ForStatement */:
                        case 247 /* ForOfStatement */:
                        case 210 /* CallExpression */:
                        case 211 /* NewExpression */:
                        case 214 /* ParenthesizedExpression */:
                            return spanInPreviousNode(node2);
                        default:
                            return spanInNode(node2.parent);
                    }
                }