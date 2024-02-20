function higher_existence(exist1, exist2) {
    if (exist1 === void 0 || exist2 === void 0)
      return exist1 || exist2;
    return exist1 > exist2 ? exist1 : exist2;
  }