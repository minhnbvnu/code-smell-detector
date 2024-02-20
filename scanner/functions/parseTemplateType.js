function parseTemplateType() {
                        const pos = getNodePos();
                        return finishNode(factory2.createTemplateLiteralType(parseTemplateHead(
                        /*isTaggedTemplate*/
                        false), parseTemplateTypeSpans()), pos);
                    }