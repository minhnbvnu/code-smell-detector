function saveAccessor(accessorType, props, name, tkn, isClass, isStatic) {
    var flagName = accessorType === "get" ? "getterToken" : "setterToken";
    var msg = "";

    if (isClass) {
      if (isStatic) {
        msg += "static ";
      }
      msg += accessorType + "ter method";
    } else {
      msg = "key";
    }

    state.tokens.curr.accessorType = accessorType;
    state.nameStack.set(tkn);

    if (props[name]) {
      if ((props[name].basic || props[name][flagName]) && name !== "__proto__") {
        warning("W075", state.tokens.next, msg, name);
      }
    } else {
      props[name] = Object.create(null);
    }

    props[name][flagName] = tkn;
  }