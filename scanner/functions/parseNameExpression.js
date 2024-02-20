function parseNameExpression() {
            var name = value, rangeStart = index - name.length;
            expect(Token.NAME);
            if (token === Token.COLON && (name === 'module' ||
                name === 'external' ||
                name === 'event')) {
                consume(Token.COLON);
                name += ':' + value;
                expect(Token.NAME);
            }
            return maybeAddRange({
                type: Syntax.NameExpression,
                name: name
            }, [rangeStart, previous]);
        }