function literalFromParts(parts) {
    let s = '';
    for (let i=0; i<parts.length; i++) {
      let literal = parts[i].literal;
      s += literal || '';
    }
    return s;
  }