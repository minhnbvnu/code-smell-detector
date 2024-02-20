function parseYieldExpression() {
                        const pos = getNodePos();
                        nextToken();
                        if (!scanner2.hasPrecedingLineBreak() && (token() === 41 /* AsteriskToken */ || isStartOfExpression())) {
                            return finishNode(factory2.createYieldExpression(parseOptionalToken(41 /* AsteriskToken */), parseAssignmentExpressionOrHigher(
                            /*allowReturnTypeInArrowFunction*/
                            true)), pos);
                        }
                        else {
                            return finishNode(factory2.createYieldExpression(
                            /*asteriskToken*/
                            void 0, 
                            /*expression*/
                            void 0), pos);
                        }
                    }