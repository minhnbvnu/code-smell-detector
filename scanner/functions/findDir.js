function findDir(node, name, allowEmpty = false) {
    for (let i = 0; i < node.props.length; i++) {
      const p = node.props[i];
      if (p.type === 7 && (allowEmpty || p.exp) && (isString(name) ? p.name === name : name.test(p.name))) {
        return p;
      }
    }
  }