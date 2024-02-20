function is_token(token, type, val) {
            return token.type == type && (val == null || token.value == val);
        }