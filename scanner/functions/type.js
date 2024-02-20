function type(obj) {
    return obj == null ? String(obj) :
      class2type[toString.call(obj)] || "object"
  }