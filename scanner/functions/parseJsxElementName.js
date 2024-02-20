function parseJsxElementName() {
                        const pos = getNodePos();
                        scanJsxIdentifier();
                        let expression = token() === 108 /* ThisKeyword */ ? parseTokenNode() : parseIdentifierName();
                        while (parseOptional(24 /* DotToken */)) {
                            expression = finishNode(factoryCreatePropertyAccessExpression(expression, parseRightSideOfDot(
                            /*allowIdentifierNames*/
                            true, 
                            /*allowPrivateIdentifiers*/
                            false)), pos);
                        }
                        return expression;
                    }