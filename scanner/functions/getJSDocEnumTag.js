function getJSDocEnumTag(node) {
            return getFirstJSDocTag(node, isJSDocEnumTag);
        }