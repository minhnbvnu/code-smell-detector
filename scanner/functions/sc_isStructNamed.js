function sc_isStructNamed(name, s) {
    return ((s instanceof sc_Struct) && (s.name === name));
}