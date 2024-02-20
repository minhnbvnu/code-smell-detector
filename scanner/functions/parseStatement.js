function parseStatement() {
                        switch (token()) {
                            case 26 /* SemicolonToken */:
                                return parseEmptyStatement();
                            case 18 /* OpenBraceToken */:
                                return parseBlock(
                                /*ignoreMissingOpenBrace*/
                                false);
                            case 113 /* VarKeyword */:
                                return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), 
                                /*modifiers*/
                                void 0);
                            case 119 /* LetKeyword */:
                                if (isLetDeclaration()) {
                                    return parseVariableStatement(getNodePos(), hasPrecedingJSDocComment(), 
                                    /*modifiers*/
                                    void 0);
                                }
                                break;
                            case 98 /* FunctionKeyword */:
                                return parseFunctionDeclaration(getNodePos(), hasPrecedingJSDocComment(), 
                                /*modifiers*/
                                void 0);
                            case 84 /* ClassKeyword */:
                                return parseClassDeclaration(getNodePos(), hasPrecedingJSDocComment(), 
                                /*modifiers*/
                                void 0);
                            case 99 /* IfKeyword */:
                                return parseIfStatement();
                            case 90 /* DoKeyword */:
                                return parseDoStatement();
                            case 115 /* WhileKeyword */:
                                return parseWhileStatement();
                            case 97 /* ForKeyword */:
                                return parseForOrForInOrForOfStatement();
                            case 86 /* ContinueKeyword */:
                                return parseBreakOrContinueStatement(248 /* ContinueStatement */);
                            case 81 /* BreakKeyword */:
                                return parseBreakOrContinueStatement(249 /* BreakStatement */);
                            case 105 /* ReturnKeyword */:
                                return parseReturnStatement();
                            case 116 /* WithKeyword */:
                                return parseWithStatement();
                            case 107 /* SwitchKeyword */:
                                return parseSwitchStatement();
                            case 109 /* ThrowKeyword */:
                                return parseThrowStatement();
                            case 111 /* TryKeyword */:
                            case 83 /* CatchKeyword */:
                            case 96 /* FinallyKeyword */:
                                return parseTryStatement();
                            case 87 /* DebuggerKeyword */:
                                return parseDebuggerStatement();
                            case 59 /* AtToken */:
                                return parseDeclaration();
                            case 132 /* AsyncKeyword */:
                            case 118 /* InterfaceKeyword */:
                            case 154 /* TypeKeyword */:
                            case 142 /* ModuleKeyword */:
                            case 143 /* NamespaceKeyword */:
                            case 136 /* DeclareKeyword */:
                            case 85 /* ConstKeyword */:
                            case 92 /* EnumKeyword */:
                            case 93 /* ExportKeyword */:
                            case 100 /* ImportKeyword */:
                            case 121 /* PrivateKeyword */:
                            case 122 /* ProtectedKeyword */:
                            case 123 /* PublicKeyword */:
                            case 126 /* AbstractKeyword */:
                            case 127 /* AccessorKeyword */:
                            case 124 /* StaticKeyword */:
                            case 146 /* ReadonlyKeyword */:
                            case 159 /* GlobalKeyword */:
                                if (isStartOfDeclaration()) {
                                    return parseDeclaration();
                                }
                                break;
                        }
                        return parseExpressionOrLabeledStatement();
                    }