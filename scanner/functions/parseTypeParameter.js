function parseTypeParameter() {
                        const pos = getNodePos();
                        const modifiers = parseModifiers(
                        /*allowDecorators*/
                        false, 
                        /*permitConstAsModifier*/
                        true);
                        const name = parseIdentifier();
                        let constraint;
                        let expression;
                        if (parseOptional(94 /* ExtendsKeyword */)) {
                            if (isStartOfType() || !isStartOfExpression()) {
                                constraint = parseType();
                            }
                            else {
                                expression = parseUnaryExpressionOrHigher();
                            }
                        }
                        const defaultType = parseOptional(63 /* EqualsToken */) ? parseType() : void 0;
                        const node = factory2.createTypeParameterDeclaration(modifiers, name, constraint, defaultType);
                        node.expression = expression;
                        return finishNode(node, pos);
                    }