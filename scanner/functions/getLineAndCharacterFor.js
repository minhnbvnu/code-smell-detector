function getLineAndCharacterFor(pos, ast) {
        const loc = ast.getLineAndCharacterOfPosition(pos);
        return {
            line: loc.line + 1,
            column: loc.character,
        };
    }