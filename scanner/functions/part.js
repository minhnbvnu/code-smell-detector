function part(v, s, e) {
      return v ? strictParseInt(v.slice(s, s + e)) : null;
    }