function parseArg(rawArg) {
    // clean up whitespace
    let arg = rawArg.trim()
      // replace comma entity with comma
      .replace(/&comma;/g, ',')
      // repair extra escape sequences; note only commas strictly need
      // escaping, but we allow any other char to be escaped since its
      // likely users will do this
      .replace(/\\(.)/g, '\$1')
      ;
    // basic argument descriptor
    let a = {
      name: arg,
      value: '',
      literal: false
    };
    // detect literal value (must be String or Number)
    let fc = arg[0];
    if (fc === '-') {
      fc = arg[1];
    }
    if (fc >= '0' && fc <= '9') {
      fc = '#';
    }
    switch(fc) {
      case "'":
      case '"':
        a.value = arg.slice(1, -1);
        a.literal = true;
        break;
      case '#':
        a.value = Number(arg);
        a.literal = true;
        break;
    }
    // if not literal, look for structured path
    if (!a.literal) {
      a.rootProperty = Polymer.Path.root(arg);
      // detect structured path (has dots)
      a.structured = Polymer.Path.isPath(arg);
      if (a.structured) {
        a.wildcard = (arg.slice(-2) == '.*');
        if (a.wildcard) {
          a.name = arg.slice(0, -2);
        }
      }
    }
    return a;
  }