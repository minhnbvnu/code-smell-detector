function getJSDocTagsNoCache(node) {
            return getJSDocTagsWorker(node, 
            /*noCache*/
            true);
        }