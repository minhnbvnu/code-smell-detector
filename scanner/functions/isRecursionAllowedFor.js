function isRecursionAllowedFor(dict) {
    if (!isName(dict.Type)) {
      return true;
    }
    var dictType = dict.Type.name;
    return GETALL_DICTIONARY_TYPES_WHITELIST[dictType] === true;
  }