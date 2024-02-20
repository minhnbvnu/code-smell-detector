function tryParseDecorator() {
                        const pos = getNodePos();
                        if (!parseOptional(59 /* AtToken */)) {
                            return void 0;
                        }
                        const expression = doInDecoratorContext(parseDecoratorExpression);
                        return finishNode(factory2.createDecorator(expression), pos);
                    }