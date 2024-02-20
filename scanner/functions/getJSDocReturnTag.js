function getJSDocReturnTag(node) {
            return getFirstJSDocTag(node, isJSDocReturnTag);
        }