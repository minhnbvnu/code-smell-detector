function parsePropertyAccessExpressionRest(pos, expression, questionDotToken) {
                        const name = parseRightSideOfDot(
                        /*allowIdentifierNames*/
                        true, 
                        /*allowPrivateIdentifiers*/
                        true);
                        const isOptionalChain2 = questionDotToken || tryReparseOptionalChain(expression);
                        const propertyAccess = isOptionalChain2 ? factoryCreatePropertyAccessChain(expression, questionDotToken, name) : factoryCreatePropertyAccessExpression(expression, name);
                        if (isOptionalChain2 && isPrivateIdentifier(propertyAccess.name)) {
                            parseErrorAtRange(propertyAccess.name, Diagnostics.An_optional_chain_cannot_contain_private_identifiers);
                        }
                        if (isExpressionWithTypeArguments(expression) && expression.typeArguments) {
                            const pos2 = expression.typeArguments.pos - 1;
                            const end = skipTrivia(sourceText, expression.typeArguments.end) + 1;
                            parseErrorAt(pos2, end, Diagnostics.An_instantiation_expression_cannot_be_followed_by_a_property_access);
                        }
                        return finishNode(propertyAccess, pos);
                    }