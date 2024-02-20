function resolveFiberType(type) {
    const typeSymbol = getTypeSymbol(type);

    switch (typeSymbol) {
      case ReactSymbols["j" /* MEMO_NUMBER */]:
      case ReactSymbols["k" /* MEMO_SYMBOL_STRING */]:
        // recursively resolving memo type in case of memo(forwardRef(Component))
        return resolveFiberType(type.type);

      case ReactSymbols["f" /* FORWARD_REF_NUMBER */]:
      case ReactSymbols["g" /* FORWARD_REF_SYMBOL_STRING */]:
        return type.render;

      default:
        return type;
    }
  }