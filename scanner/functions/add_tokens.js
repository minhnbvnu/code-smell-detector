function add_tokens(str, start, end) {
                return str instanceof NodeWithToken ? str : new NodeWithToken(str, start, end);
        }