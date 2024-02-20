function getJSDocThisTag(node) {
            return getFirstJSDocTag(node, isJSDocThisTag);
        }