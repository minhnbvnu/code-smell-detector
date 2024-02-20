function isNewIdentifierDefinitionLocation() {
                if (contextToken) {
                    const containingNodeKind = contextToken.parent.kind;
                    const tokenKind = keywordForNode(contextToken);
                    switch (tokenKind) {
                        case 27 /* CommaToken */:
                            return containingNodeKind === 210 /* CallExpression */ || containingNodeKind === 173 /* Constructor */ || containingNodeKind === 211 /* NewExpression */ || containingNodeKind === 206 /* ArrayLiteralExpression */ || containingNodeKind === 223 /* BinaryExpression */ || containingNodeKind === 181 /* FunctionType */ || containingNodeKind === 207 /* ObjectLiteralExpression */;
                        case 20 /* OpenParenToken */:
                            return containingNodeKind === 210 /* CallExpression */ || containingNodeKind === 173 /* Constructor */ || containingNodeKind === 211 /* NewExpression */ || containingNodeKind === 214 /* ParenthesizedExpression */ || containingNodeKind === 193 /* ParenthesizedType */;
                        case 22 /* OpenBracketToken */:
                            return containingNodeKind === 206 /* ArrayLiteralExpression */ || containingNodeKind === 178 /* IndexSignature */ || containingNodeKind === 164 /* ComputedPropertyName */;
                        case 142 /* ModuleKeyword */:
                        case 143 /* NamespaceKeyword */:
                        case 100 /* ImportKeyword */:
                            return true;
                        case 24 /* DotToken */:
                            return containingNodeKind === 264 /* ModuleDeclaration */;
                        case 18 /* OpenBraceToken */:
                            return containingNodeKind === 260 /* ClassDeclaration */ || containingNodeKind === 207 /* ObjectLiteralExpression */;
                        case 63 /* EqualsToken */:
                            return containingNodeKind === 257 /* VariableDeclaration */ || containingNodeKind === 223 /* BinaryExpression */;
                        case 15 /* TemplateHead */:
                            return containingNodeKind === 225 /* TemplateExpression */;
                        case 16 /* TemplateMiddle */:
                            return containingNodeKind === 236 /* TemplateSpan */;
                        case 132 /* AsyncKeyword */:
                            return containingNodeKind === 171 /* MethodDeclaration */ || containingNodeKind === 300 /* ShorthandPropertyAssignment */;
                        case 41 /* AsteriskToken */:
                            return containingNodeKind === 171 /* MethodDeclaration */;
                    }
                    if (isClassMemberCompletionKeyword(tokenKind)) {
                        return true;
                    }
                }
                return false;
            }