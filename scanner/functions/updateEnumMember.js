function updateEnumMember(node, name, initializer) {
                return node.name !== name || node.initializer !== initializer ? update(createEnumMember(name, initializer), node) : node;
            }