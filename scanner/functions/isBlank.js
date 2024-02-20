function isBlank(char) {
    // full list see https://en.wikipedia.org/wiki/Whitespace_character#cite_note-11
    return !!/^\s$/.exec(char);
}