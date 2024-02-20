function getJSDocProtectedTagNoCache(node) {
            return getFirstJSDocTag(node, isJSDocProtectedTag, 
            /*noCache*/
            true);
        }