function parseTemplateSpan(isTaggedTemplate) {
                        const pos = getNodePos();
                        return finishNode(factory2.createTemplateSpan(allowInAnd(parseExpression), parseLiteralOfTemplateSpan(isTaggedTemplate)), pos);
                    }