function isShebangTrivia(text, pos) {
            Debug.assert(pos === 0);
            return shebangTriviaRegex.test(text);
        }