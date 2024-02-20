function getJSDocPrivateTagNoCache(node) {
            return getFirstJSDocTag(node, isJSDocPrivateTag, 
            /*noCache*/
            true);
        }