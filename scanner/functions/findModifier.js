function findModifier(node, kind) {
            return canHaveModifiers(node) ? find(node.modifiers, (m) => m.kind === kind) : void 0;
        }