function sc_toWriteCircleString(o) {
    var symb = sc_gensym("writeCircle");
    var nbPointer = new Object();
    nbPointer.nb = 0;
    sc_prepWriteCircle(o, symb, nbPointer);
    return sc_genToWriteCircleString(o, symb);
}