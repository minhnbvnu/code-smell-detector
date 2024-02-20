function getJSDocDeprecatedTag(node) {
            return getFirstJSDocTag(node, isJSDocDeprecatedTag);
        }