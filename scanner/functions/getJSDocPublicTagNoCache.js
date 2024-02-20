function getJSDocPublicTagNoCache(node) {
            return getFirstJSDocTag(node, isJSDocPublicTag, 
            /*noCache*/
            true);
        }