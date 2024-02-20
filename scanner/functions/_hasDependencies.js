function _hasDependencies(key) {
    var hasDependencies;

    switch (key) {
      case _FORMAT.TXT:
      case _FORMAT.CSV:
      case _FORMAT.XLS:
        hasDependencies = true;
        break;
      default:
        hasDependencies = _isEnhanced(key);
    }
    return hasDependencies;
  }