function createTemplateExpression(head, templateSpans) {
                const node = createBaseNode(225 /* TemplateExpression */);
                node.head = head;
                node.templateSpans = createNodeArray(templateSpans);
                node.transformFlags |= propagateChildFlags(node.head) | propagateChildrenFlags(node.templateSpans) | 1024 /* ContainsES2015 */;
                return node;
            }