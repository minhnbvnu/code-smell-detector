function isPragmaToken(tt) {
    switch (tt) {
      case IDENTIFIER:
      case STRING:
      case NUMBER:
      case NULL:
      case TRUE:
      case FALSE:
        return true;
    }
    return false;
}