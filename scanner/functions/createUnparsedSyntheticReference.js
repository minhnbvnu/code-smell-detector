function createUnparsedSyntheticReference(section) {
                const node = createBaseNode(307 /* UnparsedSyntheticReference */);
                node.data = section.data;
                node.section = section;
                return node;
            }