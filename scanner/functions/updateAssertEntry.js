function updateAssertEntry(node, name, value) {
                return node.name !== name || node.value !== value ? update(createAssertEntry(name, value), node) : node;
            }