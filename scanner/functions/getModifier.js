function getModifier(node, kind) {
        if (node.modifiers !== undefined)
            for (const modifier of node.modifiers)
                if (modifier.kind === kind)
                    return modifier;
    }