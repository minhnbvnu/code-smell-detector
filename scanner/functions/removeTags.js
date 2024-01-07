function removeTags(tags) {
        tagStack = tagStack.filter(function (tag) {
            return tags.find(function (t) {
                return t === tag;
            }) === undefined;
        });
    }