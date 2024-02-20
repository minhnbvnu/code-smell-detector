function is_alias() {
        return is("name") || is_identifier_string(S.token.value);
    }