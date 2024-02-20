function padBetweenNodes(tokens) {
    if (tokens.length < 2)
        return tokens;
    const padded = [tokens[0]];
    for (let i = 1; i < tokens.length; i++) {
        if (needPadding(tokens[i - 1], tokens[i])) {
            padded.push(new blank_1.Blank(' '));
        }
        padded.push(tokens[i]);
    }
    return padded;
}