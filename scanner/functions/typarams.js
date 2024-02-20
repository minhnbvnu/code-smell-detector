function typarams() {
    if (content == ">") return cont();
    if (content == ",") return cont(typarams);
    if (content == ":") return cont(rtype, typarams);
    return pass(rtype, typarams);
  }