function getShebang(text) {
            const match = shebangTriviaRegex.exec(text);
            if (match) {
                return match[0];
            }
        }