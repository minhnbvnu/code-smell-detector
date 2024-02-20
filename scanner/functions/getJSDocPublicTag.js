function getJSDocPublicTag(node) {
            return getFirstJSDocTag(node, isJSDocPublicTag);
        }