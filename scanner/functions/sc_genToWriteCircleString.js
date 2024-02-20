function sc_genToWriteCircleString(o, symb) {
    if (!(o instanceof sc_Pair ||
	  o instanceof sc_Vector))
	return sc_toWriteString(o);
    return o.sc_toWriteCircleString(symb);
}