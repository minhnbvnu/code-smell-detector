function parseFieldName() {
            var v = value;
            if (token === Token.NAME || token === Token.STRING) {
                next();
                return v;
            }
            if (token === Token.NUMBER) {
                consume(Token.NUMBER);
                return String(v);
            }
            utility.throwError('unexpected token');
        }