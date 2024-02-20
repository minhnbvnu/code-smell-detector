function parseTemplateTagTypeParameter() {
                                const typeParameterPos = getNodePos();
                                const isBracketed = parseOptionalJsdoc(22 /* OpenBracketToken */);
                                if (isBracketed) {
                                    skipWhitespace();
                                }
                                const name = parseJSDocIdentifierName(Diagnostics.Unexpected_token_A_type_parameter_name_was_expected_without_curly_braces);
                                let defaultType;
                                if (isBracketed) {
                                    skipWhitespace();
                                    parseExpected(63 /* EqualsToken */);
                                    defaultType = doInsideOfContext(8388608 /* JSDoc */, parseJSDocType);
                                    parseExpected(23 /* CloseBracketToken */);
                                }
                                if (nodeIsMissing(name)) {
                                    return void 0;
                                }
                                return finishNode(factory2.createTypeParameterDeclaration(
                                /*modifiers*/
                                void 0, name, 
                                /*constraint*/
                                void 0, defaultType), typeParameterPos);
                            }