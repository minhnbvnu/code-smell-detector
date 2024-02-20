function nodeOrChildIsDecorated(useLegacyDecorators, node, parent2, grandparent) {
            return nodeIsDecorated(useLegacyDecorators, node, parent2, grandparent) || childIsDecorated(useLegacyDecorators, node, parent2);
        }