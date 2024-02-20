function updatePropertySignature(node, modifiers, name, questionToken, type) {
                return node.modifiers !== modifiers || node.name !== name || node.questionToken !== questionToken || node.type !== type ? finishUpdatePropertySignature(createPropertySignature(modifiers, name, questionToken, type), node) : node;
            }