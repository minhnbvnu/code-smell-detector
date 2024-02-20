function nodeIsDecorated(useLegacyDecorators, node, parent2, grandparent) {
            return hasDecorators(node) && nodeCanBeDecorated(useLegacyDecorators, node, parent2, grandparent);
        }