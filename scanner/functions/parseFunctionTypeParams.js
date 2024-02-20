function parseFunctionTypeParams() {
        var ret = { params: [], rest: null };
        while (lookahead.type === Token.Identifier) {
            ret.params.push(parseFunctionTypeParam());
            if (!match(')')) {
                expect(',');
            }
        }

        if (match('...')) {
            lex();
            ret.rest = parseFunctionTypeParam();
        }
        return ret;
    }