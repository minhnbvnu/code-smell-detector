function parseTemplateTypeSpans() {
                        const pos = getNodePos();
                        const list = [];
                        let node;
                        do {
                            node = parseTemplateTypeSpan();
                            list.push(node);
                        } while (node.literal.kind === 16 /* TemplateMiddle */);
                        return createNodeArray(list, pos);
                    }