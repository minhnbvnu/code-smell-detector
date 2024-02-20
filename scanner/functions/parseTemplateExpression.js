function parseTemplateExpression(isTaggedTemplate) {
                        const pos = getNodePos();
                        return finishNode(factory2.createTemplateExpression(parseTemplateHead(isTaggedTemplate), parseTemplateSpans(isTaggedTemplate)), pos);
                    }