function updateTemplateSpan(node, expression, literal) {
                return node.expression !== expression || node.literal !== literal ? update(createTemplateSpan(expression, literal), node) : node;
            }