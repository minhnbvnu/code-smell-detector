function countMember(m) {
    if (membersOnly && typeof membersOnly[m] !== "boolean") {
      warning("W036", state.tokens.curr, m);
    }
    if (typeof member[m] === "number") {
      member[m] += 1;
    } else {
      member[m] = 1;
    }
  }