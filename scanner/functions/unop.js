function unop(code) {
    if (code === UNARY_PLUS)
        code = PLUS;
    else if (code === UNARY_MINUS)
        code = MINUS;
    return definitions.tokens[code];
}