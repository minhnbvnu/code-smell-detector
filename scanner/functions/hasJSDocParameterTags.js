function hasJSDocParameterTags(node) {
            return !!getFirstJSDocTag(node, isJSDocParameterTag);
        }