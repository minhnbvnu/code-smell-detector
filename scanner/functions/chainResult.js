function chainResult(instance, obj) {
    return instance._chain ? _$1(obj).chain() : obj;
  }