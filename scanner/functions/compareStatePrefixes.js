function compareStatePrefixes(enteringStateName, exitingStateName) {
    var enteringStateSuffixIndex = enteringStateName.lastIndexOf('.');
    var exitingStateSuffixIndex = exitingStateName.lastIndexOf('.');

    // if either of the prefixes are empty, just return false
    if ( enteringStateSuffixIndex < 0 || exitingStateSuffixIndex < 0 ) {
      return false;
    }

    var enteringPrefix = enteringStateName.substring(0, enteringStateSuffixIndex);
    var exitingPrefix = exitingStateName.substring(0, exitingStateSuffixIndex);

    return enteringPrefix === exitingPrefix;
  }