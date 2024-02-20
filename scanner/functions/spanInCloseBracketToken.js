function spanInCloseBracketToken(node2) {
                    switch (node2.parent.kind) {
                        case 204 /* ArrayBindingPattern */:
                            const bindingPattern = node2.parent;
                            return textSpan(lastOrUndefined(bindingPattern.elements) || bindingPattern);
                        default:
                            if (isArrayLiteralOrObjectLiteralDestructuringPattern(node2.parent)) {
                                const arrayLiteral = node2.parent;
                                return textSpan(lastOrUndefined(arrayLiteral.elements) || arrayLiteral);
                            }
                            return spanInNode(node2.parent);
                    }
                }