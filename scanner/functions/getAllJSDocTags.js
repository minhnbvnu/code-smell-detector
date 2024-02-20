function getAllJSDocTags(node, predicate) {
            return getJSDocTags(node).filter(predicate);
        }