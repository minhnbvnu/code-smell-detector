function classifyTokenType(tokenKind, token) {
                if (isKeyword(tokenKind)) {
                    return 3 /* keyword */;
                }
                if (tokenKind === 29 /* LessThanToken */ || tokenKind === 31 /* GreaterThanToken */) {
                    if (token && getTypeArgumentOrTypeParameterList(token.parent)) {
                        return 10 /* punctuation */;
                    }
                }
                if (isPunctuation(tokenKind)) {
                    if (token) {
                        const parent2 = token.parent;
                        if (tokenKind === 63 /* EqualsToken */) {
                            if (parent2.kind === 257 /* VariableDeclaration */ || parent2.kind === 169 /* PropertyDeclaration */ || parent2.kind === 166 /* Parameter */ || parent2.kind === 288 /* JsxAttribute */) {
                                return 5 /* operator */;
                            }
                        }
                        if (parent2.kind === 223 /* BinaryExpression */ || parent2.kind === 221 /* PrefixUnaryExpression */ || parent2.kind === 222 /* PostfixUnaryExpression */ || parent2.kind === 224 /* ConditionalExpression */) {
                            return 5 /* operator */;
                        }
                    }
                    return 10 /* punctuation */;
                }
                else if (tokenKind === 8 /* NumericLiteral */) {
                    return 4 /* numericLiteral */;
                }
                else if (tokenKind === 9 /* BigIntLiteral */) {
                    return 25 /* bigintLiteral */;
                }
                else if (tokenKind === 10 /* StringLiteral */) {
                    return token && token.parent.kind === 288 /* JsxAttribute */ ? 24 /* jsxAttributeStringLiteralValue */ : 6 /* stringLiteral */;
                }
                else if (tokenKind === 13 /* RegularExpressionLiteral */) {
                    return 6 /* stringLiteral */;
                }
                else if (isTemplateLiteralKind(tokenKind)) {
                    return 6 /* stringLiteral */;
                }
                else if (tokenKind === 11 /* JsxText */) {
                    return 23 /* jsxText */;
                }
                else if (tokenKind === 79 /* Identifier */) {
                    if (token) {
                        switch (token.parent.kind) {
                            case 260 /* ClassDeclaration */:
                                if (token.parent.name === token) {
                                    return 11 /* className */;
                                }
                                return;
                            case 165 /* TypeParameter */:
                                if (token.parent.name === token) {
                                    return 15 /* typeParameterName */;
                                }
                                return;
                            case 261 /* InterfaceDeclaration */:
                                if (token.parent.name === token) {
                                    return 13 /* interfaceName */;
                                }
                                return;
                            case 263 /* EnumDeclaration */:
                                if (token.parent.name === token) {
                                    return 12 /* enumName */;
                                }
                                return;
                            case 264 /* ModuleDeclaration */:
                                if (token.parent.name === token) {
                                    return 14 /* moduleName */;
                                }
                                return;
                            case 166 /* Parameter */:
                                if (token.parent.name === token) {
                                    return isThisIdentifier(token) ? 3 /* keyword */ : 17 /* parameterName */;
                                }
                                return;
                        }
                        if (isConstTypeReference(token.parent)) {
                            return 3 /* keyword */;
                        }
                    }
                    return 2 /* identifier */;
                }
            }