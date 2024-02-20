function vectorizeTokens(tokens) {
    const vector = {};
    for (token of tokens) {
        if (token.length > NGRAM) {
            for (let i = 0; i < token.length - NGRAM; i++) {
                let trigram = token.substring(i, i + NGRAM);
                vector[trigram] = (vector[trigram] || 0) + 1;
            }
        } else {
            vector[token] = (vector[token] || 0) + 1;
        }
    }
    normalizeVector(vector);
    return vector;
}