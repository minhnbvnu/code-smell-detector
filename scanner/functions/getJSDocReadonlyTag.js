function getJSDocReadonlyTag(node) {
            return getFirstJSDocTag(node, isJSDocReadonlyTag);
        }