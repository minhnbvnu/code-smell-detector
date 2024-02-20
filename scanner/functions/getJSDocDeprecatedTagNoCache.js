function getJSDocDeprecatedTagNoCache(node) {
            return getFirstJSDocTag(node, isJSDocDeprecatedTag, 
            /*noCache*/
            true);
        }