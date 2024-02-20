function isStartCharacter(char) {
    // single quote may be not end character: `what's this`
    return '"'.includes(char);
}