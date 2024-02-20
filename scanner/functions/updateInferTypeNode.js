function updateInferTypeNode(node, typeParameter) {
                return node.typeParameter !== typeParameter ? update(createInferTypeNode(typeParameter), node) : node;
            }