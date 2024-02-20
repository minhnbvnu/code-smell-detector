function compactArray(tokens) {
    let i = 0;
    for (let j = 0; j < tokens.length; j++) {
        const curr = tokens[j];
        if (i - 1 >= 0) {
            const prev = tokens[i - 1];
            if ((0, type_guards_1.isUnicodeString)(curr) && (0, type_guards_1.isUnicodeString)(prev)) {
                tokens[i - 1] = new unicode_string_1.UnicodeString(prev.text + curr.text);
                continue;
            }
            if ((0, type_guards_1.isAlphabetNumeric)(curr) && (0, type_guards_1.isAlphabetNumeric)(prev)) {
                tokens[i - 1] = alphabet_numeric_1.AlphabetNumeric.create(prev.text + curr.text);
                continue;
            }
        }
        tokens[i++] = curr;
    }
    while (tokens.length > i)
        tokens.pop();
}