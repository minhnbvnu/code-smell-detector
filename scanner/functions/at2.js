function at2({ offset: e, line: t, column: r }, n2) {
    let o = { offset: e, line: t, column: r };
    if (n2) {
      let i = n2.split(/\n|\r\n?|\f/);
      o.offset += n2.length, o.line += i.length - 1, o.column = i.length === 1 ? o.column + n2.length : i.pop().length + 1;
    }
    return o;
  }