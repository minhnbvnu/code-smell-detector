function getJSDocClassTag(node) {
            return getFirstJSDocTag(node, isJSDocClassTag);
        }