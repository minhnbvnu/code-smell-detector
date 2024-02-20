function parseSpreadElement() {
                        const pos = getNodePos();
                        parseExpected(25 /* DotDotDotToken */);
                        const expression = parseAssignmentExpressionOrHigher(
                        /*allowReturnTypeInArrowFunction*/
                        true);
                        return finishNode(factory2.createSpreadElement(expression), pos);
                    }