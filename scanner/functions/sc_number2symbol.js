function sc_number2symbol(x, radix) {
    return sc_SYMBOL_PREFIX + sc_number2jsstring(x, radix);
}