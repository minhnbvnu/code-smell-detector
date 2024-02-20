function spanInCloseBraceToken(node2) {
                    switch (node2.parent.kind) {
                        case 265 /* ModuleBlock */:
                            if (getModuleInstanceState(node2.parent.parent) !== 1 /* Instantiated */) {
                                return void 0;
                            }
                        case 263 /* EnumDeclaration */:
                        case 260 /* ClassDeclaration */:
                            return textSpan(node2);
                        case 238 /* Block */:
                            if (isFunctionBlock(node2.parent)) {
                                return textSpan(node2);
                            }
                        case 295 /* CatchClause */:
                            return spanInNode(lastOrUndefined(node2.parent.statements));
                        case 266 /* CaseBlock */:
                            const caseBlock = node2.parent;
                            const lastClause = lastOrUndefined(caseBlock.clauses);
                            if (lastClause) {
                                return spanInNode(lastOrUndefined(lastClause.statements));
                            }
                            return void 0;
                        case 203 /* ObjectBindingPattern */:
                            const bindingPattern = node2.parent;
                            return spanInNode(lastOrUndefined(bindingPattern.elements) || bindingPattern);
                        default:
                            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node2.parent)) {
                                const objectLiteral = node2.parent;
                                return textSpan(lastOrUndefined(objectLiteral.properties) || objectLiteral);
                            }
                            return spanInNode(node2.parent);
                    }
                }