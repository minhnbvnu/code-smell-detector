function getJSDocAugmentsTag(node) {
            return getFirstJSDocTag(node, isJSDocAugmentsTag);
        }