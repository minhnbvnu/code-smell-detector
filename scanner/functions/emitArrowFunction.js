function emitArrowFunction(node) {
                emitModifierList(node, node.modifiers);
                emitSignatureAndBody(node, emitArrowFunctionHead);
            }