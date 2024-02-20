function NumberOf(val) {
    const res = toNumber(val);
    {
      assertNumber(res, "<transition> explicit duration");
    }
    return res;
  }