function artifact(tok) {
        if (!tok) {
            tok = next_token;
        }
        return tok.number || tok.string;
    }