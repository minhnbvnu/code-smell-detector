function advance_identifier(string) {
        if (next_token.identifier && next_token.string === string) {
            advance();
        } else {
            warn('expected_a_b', next_token, string, artifact());
        }
    }