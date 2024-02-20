function getTypeSymbol(type) {
    const symbolOrNumber = typeof type === 'object' && type !== null ? type.$$typeof : type;
    return typeof symbolOrNumber === 'symbol' ? // $FlowFixMe `toString()` doesn't match the type signature?
    symbolOrNumber.toString() : symbolOrNumber;
  }