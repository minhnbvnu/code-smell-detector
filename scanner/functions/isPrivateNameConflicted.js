function isPrivateNameConflicted(privateNameMap, element) {
    var name2 = element.key.name;
    var curr = privateNameMap[name2];
    var next = "true";
    if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set")) {
      next = (element.static ? "s" : "i") + element.kind;
    }
    if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget") {
      privateNameMap[name2] = "true";
      return false;
    } else if (!curr) {
      privateNameMap[name2] = next;
      return false;
    } else {
      return true;
    }
  }