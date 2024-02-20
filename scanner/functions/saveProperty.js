function saveProperty(props, name, tkn, isClass, isStatic) {
    var msg = ["key", "class method", "static class method"];
    msg = msg[(isClass || false) + (isStatic || false)];
    if (tkn.identifier) {
      name = tkn.value;
    }

    if (props[name] && name !== "__proto__") {
      warning("W075", state.tokens.next, msg, name);
    } else {
      props[name] = Object.create(null);
    }

    props[name].basic = true;
    props[name].basictkn = tkn;
  }