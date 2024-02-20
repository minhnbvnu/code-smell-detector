function createFilterTagFromJSON(tag) {
        const tagId = parseInt(tag.tagId, 10);
        const { keyword } = tag;

        return new FilterTag(tagId, keyword);
    }