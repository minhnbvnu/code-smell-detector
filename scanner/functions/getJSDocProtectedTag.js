function getJSDocProtectedTag(node) {
            return getFirstJSDocTag(node, isJSDocProtectedTag);
        }