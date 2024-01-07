function resolveMarkupTags(tags, numSymbols) {
    if (tags.length === 0) {
        return null;
    }

    // make list of tag start/end edges
    const edges = { };
    for (let index = 0; index < tags.length; ++index) {
        const tag = tags[index];
        if (!edges.hasOwnProperty(tag.start)) {
            edges[tag.start] = { open: [tag], close: null };
        } else {
            if (edges[tag.start].open === null) {
                edges[tag.start].open = [tag];
            } else {
                edges[tag.start].open.push(tag);
            }
        }

        if (!edges.hasOwnProperty(tag.end)) {
            edges[tag.end] = { open: null, close: [tag] };
        } else {
            if (edges[tag.end].close === null) {
                edges[tag.end].close = [tag];
            } else {
                edges[tag.end].close.push(tag);
            }
        }
    }

    // build tag instances from open/close edges
    let tagStack = [];

    function removeTags(tags) {
        tagStack = tagStack.filter(function (tag) {
            return tags.find(function (t) {
                return t === tag;
            }) === undefined;
        });
    }

    function addTags(tags) {
        for (let index = 0; index < tags.length; ++index) {
            tagStack.push(tags[index]);
        }
    }

    const edgeKeys = Object.keys(edges).sort(function (a, b) {
        return a - b;
    });

    const resolvedTags = [];
    for (let index = 0; index < edgeKeys.length; ++index) {
        const edge = edges[edgeKeys[index]];

        // remove close tags
        if (edge.close !== null) {
            removeTags(edge.close);
        }

        // add open tags
        if (edge.open !== null) {
            addTags(edge.open);
        }

        // store the resolved tags
        resolvedTags.push({
            start: edgeKeys[index],
            tags: combineTags(tagStack)
        });
    }

    // assign the resolved tags per-character
    const result = [];
    let prevTag = null;
    for (let index = 0; index < resolvedTags.length; ++index) {
        const resolvedTag = resolvedTags[index];
        while (result.length < resolvedTag.start) {
            result.push(prevTag ? prevTag.tags : null);
        }
        prevTag = resolvedTag;
    }
    while (result.length < numSymbols) {
        result.push(null);
    }

    return result;
}