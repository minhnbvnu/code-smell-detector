function lookahead_is_range() {
    let type;
    let offset2 = 0;
    let count = 0;
    let delim_found = false;
    let no_colon = true;
    do {
      type = this.lookupNonWSType(offset2++);
      if (type !== WhiteSpace) {
        count++;
      }
      if (type === Delim) {
        delim_found = true;
      }
      if (type === Colon) {
        no_colon = false;
      }
      if (type === LeftCurlyBracket || type === RightParenthesis) {
        break;
      }
    } while (type !== EOF && count <= 6);
    return delim_found && no_colon;
  }