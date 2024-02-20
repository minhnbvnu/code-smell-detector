function updateAssertClause(node, elements, multiLine) {
                return node.elements !== elements || node.multiLine !== multiLine ? update(createAssertClause(elements, multiLine), node) : node;
            }