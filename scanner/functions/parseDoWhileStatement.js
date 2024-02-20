function parseDoWhileStatement() {
        var body, test, oldInIteration, marker = markerCreate();

        expectKeyword('do');

        oldInIteration = state.inIteration;
        state.inIteration = true;

        body = parseStatement();

        state.inIteration = oldInIteration;

        expectKeyword('while');

        expect('(');

        test = parseExpression();

        expect(')');

        if (match(';')) {
            lex();
        }

        return markerApply(marker, delegate.createDoWhileStatement(body, test));
    }