function parseTypeOperator(operator) {
                        const pos = getNodePos();
                        parseExpected(operator);
                        return finishNode(factory2.createTypeOperatorNode(operator, parseTypeOperatorOrHigher()), pos);
                    }