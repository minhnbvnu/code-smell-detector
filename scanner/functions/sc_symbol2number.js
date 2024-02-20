function sc_symbol2number(s, radix) {
    return sc_jsstring2number(s.slice(1), radix);
}