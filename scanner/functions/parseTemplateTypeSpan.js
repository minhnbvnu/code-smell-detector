function parseTemplateTypeSpan() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTemplateLiteralTypeSpan(parseType(), parseLiteralOfTemplateSpan(
                        /*isTaggedTemplate*/
                        false)), pos);
                    }