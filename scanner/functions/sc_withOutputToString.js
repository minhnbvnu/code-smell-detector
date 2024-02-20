function sc_withOutputToString(thunk) {
    var p = new sc_StringOutputPort();
    sc_withOutputToPort(p, thunk);
    return p.close();
}