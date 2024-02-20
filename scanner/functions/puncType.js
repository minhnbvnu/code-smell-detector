function puncType(type) {
    return !type ? null : /\bpunctuation\b/.test(type) ? type : undefined
  }