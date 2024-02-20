function parseTemplateSpans(isTaggedTemplate) {
                        const pos = getNodePos();
                        const list = [];
                        let node;
                        do {
                            node = parseTemplateSpan(isTaggedTemplate);
                            list.push(node);
                        } while (node.literal.kind === 16 /* TemplateMiddle */);
                        return createNodeArray(list, pos);
                    }