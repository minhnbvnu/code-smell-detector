function createInferTypeNode(typeParameter) {
                const node = createBaseNode(192 /* InferType */);
                node.typeParameter = typeParameter;
                node.transformFlags = 1 /* ContainsTypeScript */;
                return node;
            }