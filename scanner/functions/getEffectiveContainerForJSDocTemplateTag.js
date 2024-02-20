function getEffectiveContainerForJSDocTemplateTag(node) {
            if (isJSDoc(node.parent) && node.parent.tags) {
                const typeAlias = find(node.parent.tags, isJSDocTypeAlias);
                if (typeAlias) {
                    return typeAlias;
                }
            }
            return getHostSignatureFromJSDoc(node);
        }