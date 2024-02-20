function getLocFor(start, end, ast) {
        return {
            start: getLineAndCharacterFor(start, ast),
            end: getLineAndCharacterFor(end, ast),
        };
    }