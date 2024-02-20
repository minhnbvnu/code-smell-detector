function updateTemplateLiteralTypeSpan(node, type, literal) {
                return node.type !== type || node.literal !== literal ? update(createTemplateLiteralTypeSpan(type, literal), node) : node;
            }