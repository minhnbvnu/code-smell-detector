function getAllJSDocTagsOfKind(node, kind) {
            return getJSDocTags(node).filter((doc) => doc.kind === kind);
        }