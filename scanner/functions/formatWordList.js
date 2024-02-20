function formatWordList(words) {
        if (!(words === null || words === void 0 ? void 0 : words.length)) {
            return '';
        }
        if (words.length === 1) {
            return words[0];
        }
        return [words.slice(0, -1).join(', '), words.slice(-1)[0]].join(' and ');
    }