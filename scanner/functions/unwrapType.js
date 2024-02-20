function unwrapType(type, self, args) {
    return type.call ? type(self, args) : type;
  }