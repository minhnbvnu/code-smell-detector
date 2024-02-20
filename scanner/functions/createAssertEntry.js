function createAssertEntry(name, value) {
                const node = createBaseNode(297 /* AssertEntry */);
                node.name = name;
                node.value = value;
                node.transformFlags |= 4 /* ContainsESNext */;
                return node;
            }