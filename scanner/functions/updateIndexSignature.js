function updateIndexSignature(node, modifiers, parameters, type) {
                return node.parameters !== parameters || node.type !== type || node.modifiers !== modifiers ? finishUpdateBaseSignatureDeclaration(createIndexSignature(modifiers, parameters, type), node) : node;
            }