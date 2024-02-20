function sc_openInputString(str) {
    return new sc_StringInputPort(sc_string2jsstring(str));
}