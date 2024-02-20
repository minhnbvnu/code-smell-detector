function emitSignatureHead(node) {
                emitTypeParameters(node, node.typeParameters);
                emitParameters(node, node.parameters);
                emitTypeAnnotation(node.type);
            }