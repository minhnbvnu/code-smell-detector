function getJSDocTemplateTag(node) {
            return getFirstJSDocTag(node, isJSDocTemplateTag);
        }