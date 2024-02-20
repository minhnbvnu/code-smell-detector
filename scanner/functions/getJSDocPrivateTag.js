function getJSDocPrivateTag(node) {
            return getFirstJSDocTag(node, isJSDocPrivateTag);
        }