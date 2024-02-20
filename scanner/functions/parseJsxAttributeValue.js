function parseJsxAttributeValue() {
                        if (token() === 63 /* EqualsToken */) {
                            if (scanJsxAttributeValue() === 10 /* StringLiteral */) {
                                return parseLiteralNode();
                            }
                            if (token() === 18 /* OpenBraceToken */) {
                                return parseJsxExpression(
                                /*inExpressionContext*/
                                true);
                            }
                            if (token() === 29 /* LessThanToken */) {
                                return parseJsxElementOrSelfClosingElementOrFragment(
                                /*inExpressionContext*/
                                true);
                            }
                            parseErrorAtCurrentToken(Diagnostics.or_JSX_element_expected);
                        }
                        return void 0;
                    }