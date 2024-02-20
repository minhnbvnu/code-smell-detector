function parseUnaryExpressionOrHigher() {
                        if (isUpdateExpression()) {
                            const pos = getNodePos();
                            const updateExpression = parseUpdateExpression();
                            return token() === 42 /* AsteriskAsteriskToken */ ? parseBinaryExpressionRest(getBinaryOperatorPrecedence(token()), updateExpression, pos) : updateExpression;
                        }
                        const unaryOperator = token();
                        const simpleUnaryExpression = parseSimpleUnaryExpression();
                        if (token() === 42 /* AsteriskAsteriskToken */) {
                            const pos = skipTrivia(sourceText, simpleUnaryExpression.pos);
                            const { end } = simpleUnaryExpression;
                            if (simpleUnaryExpression.kind === 213 /* TypeAssertionExpression */) {
                                parseErrorAt(pos, end, Diagnostics.A_type_assertion_expression_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses);
                            }
                            else {
                                parseErrorAt(pos, end, Diagnostics.An_unary_expression_with_the_0_operator_is_not_allowed_in_the_left_hand_side_of_an_exponentiation_expression_Consider_enclosing_the_expression_in_parentheses, tokenToString(unaryOperator));
                            }
                        }
                        return simpleUnaryExpression;
                    }