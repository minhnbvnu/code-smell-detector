function is_vardefs() {
        var token = peek();
        return is_token(token, "name") || is_token(token, "punc", "[") || is_token(token, "punc", "{");
    }