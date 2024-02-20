function parseObjectPattern() {
        var node = new Node(), properties = [];

        expect('{');

        while (!match('}')) {
            properties.push(parsePropertyPattern());
            if (!match('}')) {
                expect(',');
            }
        }

        lex();

        return node.finishObjectPattern(properties);
    }