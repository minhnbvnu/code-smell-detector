function addTags(tags) {
        for (let index = 0; index < tags.length; ++index) {
            tagStack.push(tags[index]);
        }
    }