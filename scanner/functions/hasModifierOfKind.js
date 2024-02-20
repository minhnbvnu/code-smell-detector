function hasModifierOfKind(node, kind) {
            return some(node.modifiers, (m) => m.kind === kind);
        }