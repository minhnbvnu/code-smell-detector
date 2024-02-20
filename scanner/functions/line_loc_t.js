function line_loc_t() {
    this.line = tokCurLine;
    this.column = tokPos - tokLineStart;
  }