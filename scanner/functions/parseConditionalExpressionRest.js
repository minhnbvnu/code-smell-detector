function parseConditionalExpressionRest(leftOperand, pos, allowReturnTypeInArrowFunction) {
                        const questionToken = parseOptionalToken(57 /* QuestionToken */);
                        if (!questionToken) {
                            return leftOperand;
                        }
                        let colonToken;
                        return finishNode(factory2.createConditionalExpression(leftOperand, questionToken, doOutsideOfContext(disallowInAndDecoratorContext, () => parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        false)), colonToken = parseExpectedToken(58 /* ColonToken */), nodeIsPresent(colonToken) ? parseAssignmentExpressionOrHigher(allowReturnTypeInArrowFunction) : createMissingNode(79 /* Identifier */, 
                        /*reportAtCurrentPosition*/
                        false, Diagnostics._0_expected, tokenToString(58 /* ColonToken */))), pos);
                    }