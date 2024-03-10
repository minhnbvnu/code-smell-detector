function isReusableStatement(node) {
                        if (node) {
                            switch (node.kind) {
                                case 259 /* FunctionDeclaration */:
                                case 240 /* VariableStatement */:
                                case 238 /* Block */:
                                case 242 /* IfStatement */:
                                case 241 /* ExpressionStatement */:
                                case 254 /* ThrowStatement */:
                                case 250 /* ReturnStatement */:
                                case 252 /* SwitchStatement */:
                                case 249 /* BreakStatement */:
                                case 248 /* ContinueStatement */:
                                case 246 /* ForInStatement */:
                                case 247 /* ForOfStatement */:
                                case 245 /* ForStatement */:
                                case 244 /* WhileStatement */:
                                case 251 /* WithStatement */:
                                case 239 /* EmptyStatement */:
                                case 255 /* TryStatement */:
                                case 253 /* LabeledStatement */:
                                case 243 /* DoStatement */:
                                case 256 /* DebuggerStatement */:
                                case 269 /* ImportDeclaration */:
                                case 268 /* ImportEqualsDeclaration */:
                                case 275 /* ExportDeclaration */:
                                case 274 /* ExportAssignment */:
                                case 264 /* ModuleDeclaration */:
                                case 260 /* ClassDeclaration */:
                                case 261 /* InterfaceDeclaration */:
                                case 263 /* EnumDeclaration */:
                                case 262 /* TypeAliasDeclaration */:
                                    return true;
                            }
                        }
                        return false;
                    }