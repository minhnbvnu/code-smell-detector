function isEndCharacter(char) {
    // single quote may not be end character: `what's this`
    // dot may not be end character: `harttle.land`
    return ',;:"!'.includes(char);
}