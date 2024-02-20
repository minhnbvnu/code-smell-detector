function getFirstJSDocTag(node, predicate, noCache) {
            return find(getJSDocTagsWorker(node, noCache), predicate);
        }