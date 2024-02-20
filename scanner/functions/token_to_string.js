function token_to_string(type, value) {
        return type + (value === undefined ? "" : " «" + value + "»");
    }