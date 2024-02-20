function parseArrayPattern() {
        var node = new Node(), elements = [], rest, restNode;
        expect('[');

        while (!match(']')) {
            if (match(',')) {
                lex();
                elements.push(null);
            } else {
                if (match('...')) {
                    restNode = new Node();
                    lex();
                    rest = parseVariableIdentifier();
                    elements.push(restNode.finishRestElement(rest));
                    break;
                } else {
                    elements.push(parsePatternWithDefault());
                }
                if (!match(']')) {
                    expect(',');
                }
            }

        }

        expect(']');

        return node.finishArrayPattern(elements);
    }