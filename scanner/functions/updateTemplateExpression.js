function updateTemplateExpression(node, head, templateSpans) {
                return node.head !== head || node.templateSpans !== templateSpans ? update(createTemplateExpression(head, templateSpans), node) : node;
            }