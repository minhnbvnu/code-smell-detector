function getJSDocTagsWorker(node, noCache) {
            var _a2, _b;
            if (!canHaveJSDoc(node))
                return emptyArray;
            let tags = (_a2 = node.jsDoc) == null ? void 0 : _a2.jsDocCache;
            if (tags === void 0 || noCache) {
                const comments = getJSDocCommentsAndTags(node, noCache);
                Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
                tags = flatMap(comments, (j) => isJSDoc(j) ? j.tags : j);
                if (!noCache) {
                    (_b = node.jsDoc) != null ? _b : node.jsDoc = [];
                    node.jsDoc.jsDocCache = tags;
                }
            }
            return tags;
        }