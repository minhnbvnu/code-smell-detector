function is_identifier_part(ch) {
        return is_identifier_start(ch) || is_decimal_digit(ch);
    }