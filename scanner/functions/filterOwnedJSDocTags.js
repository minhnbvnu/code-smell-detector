function filterOwnedJSDocTags(hostNode, jsDoc) {
            if (isJSDoc(jsDoc)) {
                const ownedTags = filter(jsDoc.tags, (tag) => ownsJSDocTag(hostNode, tag));
                return jsDoc.tags === ownedTags ? [jsDoc] : ownedTags;
            }
            return ownsJSDocTag(hostNode, jsDoc) ? [jsDoc] : void 0;
        }