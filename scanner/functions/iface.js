function iface(type) {
    if (type == "name") {cx.marked = "def"; return cont(iface);}
    if (content == "<") return cont(typarams, iface);
    if (type == "{") return cont(pushlex("}"), block, poplex);
    return pass();
  }