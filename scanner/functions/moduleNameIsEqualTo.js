function moduleNameIsEqualTo(a, b) {
                return a.kind === 79 /* Identifier */ ? b.kind === 79 /* Identifier */ && a.escapedText === b.escapedText : b.kind === 10 /* StringLiteral */ && a.text === b.text;
            }