function attrSet(token, name, value) {
    const index = token.attrIndex(name);
    const attr = [name, value];

    if (index < 0) {
      token.attrPush(attr);
    } else {
      token.attrs[index] = attr;
    }
  }