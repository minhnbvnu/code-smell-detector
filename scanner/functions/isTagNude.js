function isTagNude(tag) {
    return tag.indexOf('Control') === -1 && tag.indexOf('Shift') === -1
        && tag.indexOf('Alt') === -1 && tag.indexOf('Command') === -1 && tag.indexOf('Win') === -1;
}