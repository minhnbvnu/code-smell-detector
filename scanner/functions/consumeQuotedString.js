function consumeQuotedString() {
            var value = '';
            consume();
            var token = peek();
            while(token && token !== '"') {
                consume();
                value += token;
                token = peek();
            }
            consume();
            return value;
        }