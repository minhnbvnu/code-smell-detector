function __jsonReviver(k, v, reviver) {
    if (v && typeof v === 'string' && __dateTest.test(v)) {
      v = new Date(v);
    }
    if (!reviver) return v;
    return reviver(k, v);
  }