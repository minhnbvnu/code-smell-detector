function updateImportEqualsDeclaration(node, modifiers, isTypeOnly, name, moduleReference) {
                return node.modifiers !== modifiers || node.isTypeOnly !== isTypeOnly || node.name !== name || node.moduleReference !== moduleReference ? update(createImportEqualsDeclaration(modifiers, isTypeOnly, name, moduleReference), node) : node;
            }