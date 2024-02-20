function isPunctuationCharacter(char) {
    if (typeof char !== 'string')
        return false;
    if (rPunctuation.exec(char))
        return true;
    if (isFullwidthPunctuation(char))
        return true;
    return false;
}