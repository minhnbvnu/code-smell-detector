function combineTags(tags) {
    if (tags.length === 0) {
        return null;
    }
    const result = { };
    for (let index = 0; index < tags.length; ++index) {
        const tag = tags[index];
        const tmp = { };
        tmp[tag.name] = { value: tag.value, attributes: tag.attributes };
        merge(result, tmp);
    }
    return result;
}