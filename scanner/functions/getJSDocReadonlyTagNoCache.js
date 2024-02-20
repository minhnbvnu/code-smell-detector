function getJSDocReadonlyTagNoCache(node) {
            return getFirstJSDocTag(node, isJSDocReadonlyTag, 
            /*noCache*/
            true);
        }