function parsePropertyAccessEntityNameExpression() {
                                const pos = getNodePos();
                                let node = parseJSDocIdentifierName();
                                while (parseOptional(24 /* DotToken */)) {
                                    const name = parseJSDocIdentifierName();
                                    node = finishNode(factoryCreatePropertyAccessExpression(node, name), pos);
                                }
                                return node;
                            }