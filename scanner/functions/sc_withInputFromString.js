function sc_withInputFromString(s, thunk) {
    return sc_withInputFromPort(new sc_StringInputPort(sc_string2jsstring(s)), thunk);
}