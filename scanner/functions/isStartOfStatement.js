function isStartOfStatement() {
                        switch (token()) {
                            case 59 /* AtToken */:
                            case 26 /* SemicolonToken */:
                            case 18 /* OpenBraceToken */:
                            case 113 /* VarKeyword */:
                            case 119 /* LetKeyword */:
                            case 98 /* FunctionKeyword */:
                            case 84 /* ClassKeyword */:
                            case 92 /* EnumKeyword */:
                            case 99 /* IfKeyword */:
                            case 90 /* DoKeyword */:
                            case 115 /* WhileKeyword */:
                            case 97 /* ForKeyword */:
                            case 86 /* ContinueKeyword */:
                            case 81 /* BreakKeyword */:
                            case 105 /* ReturnKeyword */:
                            case 116 /* WithKeyword */:
                            case 107 /* SwitchKeyword */:
                            case 109 /* ThrowKeyword */:
                            case 111 /* TryKeyword */:
                            case 87 /* DebuggerKeyword */:
                            case 83 /* CatchKeyword */:
                            case 96 /* FinallyKeyword */:
                                return true;
                            case 100 /* ImportKeyword */:
                                return isStartOfDeclaration() || lookAhead(nextTokenIsOpenParenOrLessThanOrDot);
                            case 85 /* ConstKeyword */:
                            case 93 /* ExportKeyword */:
                                return isStartOfDeclaration();
                            case 132 /* AsyncKeyword */:
                            case 136 /* DeclareKeyword */:
                            case 118 /* InterfaceKeyword */:
                            case 142 /* ModuleKeyword */:
                            case 143 /* NamespaceKeyword */:
                            case 154 /* TypeKeyword */:
                            case 159 /* GlobalKeyword */:
                                return true;
                            case 127 /* AccessorKeyword */:
                            case 123 /* PublicKeyword */:
                            case 121 /* PrivateKeyword */:
                            case 122 /* ProtectedKeyword */:
                            case 124 /* StaticKeyword */:
                            case 146 /* ReadonlyKeyword */:
                                return isStartOfDeclaration() || !lookAhead(nextTokenIsIdentifierOrKeywordOnSameLine);
                            default:
                                return isStartOfExpression();
                        }
                    }