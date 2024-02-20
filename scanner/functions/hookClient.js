function hookClient(stream) {
    // \N means NULL
    // ref: http://dev.mysql.com/doc/refman/5.5/en/null-values.html
    if (stream.eat("N")) {
        return "atom";
    }
    // \g, etc
    // ref: http://dev.mysql.com/doc/refman/5.5/en/mysql-commands.html
    return stream.match(/^[a-zA-Z.#!?]/) ? "variable-2" : null;
  }