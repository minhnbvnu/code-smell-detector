function parseMemberExpressionOrHigher() {
                        const pos = getNodePos();
                        const expression = parsePrimaryExpression();
                        return parseMemberExpressionRest(pos, expression, 
                        /*allowOptionalChain*/
                        true);
                    }