function rtype(type) {
    if (type == "name") {cx.marked = "variable-3"; return cont(rtypemaybeparam); }
    if (content == "mutable") {cx.marked = "keyword"; return cont(rtype);}
    if (type == "atom") return cont(rtypemaybeparam);
    if (type == "op" || type == "obj") return cont(rtype);
    if (type == "fn") return cont(fntype);
    if (type == "{") return cont(pushlex("{"), record_of(rtype), poplex);
    return matchBrackets(type, rtype);
  }