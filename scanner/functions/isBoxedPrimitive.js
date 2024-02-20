function isBoxedPrimitive(value) {
      return isNumberObject3(value) || isStringObject(value) || isBooleanObject2(value) || isBigIntObject(value) || isSymbolObject(value);
    }