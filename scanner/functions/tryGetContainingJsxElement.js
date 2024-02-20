function tryGetContainingJsxElement(contextToken2) {
                if (contextToken2) {
                    const parent2 = contextToken2.parent;
                    switch (contextToken2.kind) {
                        case 31 /* GreaterThanToken */:
                        case 30 /* LessThanSlashToken */:
                        case 43 /* SlashToken */:
                        case 79 /* Identifier */:
                        case 208 /* PropertyAccessExpression */:
                        case 289 /* JsxAttributes */:
                        case 288 /* JsxAttribute */:
                        case 290 /* JsxSpreadAttribute */:
                            if (parent2 && (parent2.kind === 282 /* JsxSelfClosingElement */ || parent2.kind === 283 /* JsxOpeningElement */)) {
                                if (contextToken2.kind === 31 /* GreaterThanToken */) {
                                    const precedingToken = findPrecedingToken(contextToken2.pos, sourceFile, 
                                    /*startNode*/
                                    void 0);
                                    if (!parent2.typeArguments || precedingToken && precedingToken.kind === 43 /* SlashToken */)
                                        break;
                                }
                                return parent2;
                            }
                            else if (parent2.kind === 288 /* JsxAttribute */) {
                                return parent2.parent.parent;
                            }
                            break;
                        case 10 /* StringLiteral */:
                            if (parent2 && (parent2.kind === 288 /* JsxAttribute */ || parent2.kind === 290 /* JsxSpreadAttribute */)) {
                                return parent2.parent.parent;
                            }
                            break;
                        case 19 /* CloseBraceToken */:
                            if (parent2 && parent2.kind === 291 /* JsxExpression */ && parent2.parent && parent2.parent.kind === 288 /* JsxAttribute */) {
                                return parent2.parent.parent.parent;
                            }
                            if (parent2 && parent2.kind === 290 /* JsxSpreadAttribute */) {
                                return parent2.parent.parent;
                            }
                            break;
                    }
                }
                return void 0;
            }