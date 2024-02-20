function shouldAddDelta(line, kind, container) {
                    switch (kind) {
                        case 18 /* OpenBraceToken */:
                        case 19 /* CloseBraceToken */:
                        case 21 /* CloseParenToken */:
                        case 91 /* ElseKeyword */:
                        case 115 /* WhileKeyword */:
                        case 59 /* AtToken */:
                            return false;
                        case 43 /* SlashToken */:
                        case 31 /* GreaterThanToken */:
                            switch (container.kind) {
                                case 283 /* JsxOpeningElement */:
                                case 284 /* JsxClosingElement */:
                                case 282 /* JsxSelfClosingElement */:
                                    return false;
                            }
                            break;
                        case 22 /* OpenBracketToken */:
                        case 23 /* CloseBracketToken */:
                            if (container.kind !== 197 /* MappedType */) {
                                return false;
                            }
                            break;
                    }
                    return nodeStartLine !== line && !(hasDecorators(node) && kind === getFirstNonDecoratorTokenOfNode(node));
                }