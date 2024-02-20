function scanShebangTrivia(text, pos) {
            const shebang = shebangTriviaRegex.exec(text)[0];
            pos = pos + shebang.length;
            return pos;
        }